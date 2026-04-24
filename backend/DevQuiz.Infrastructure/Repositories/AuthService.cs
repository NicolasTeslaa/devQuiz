using DevQuiz.Application.Dtos.Auth;
using DevQuiz.Application.Interfaces;
using DevQuiz.Domain.Entities;
using DevQuiz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DevQuiz.Infrastructure.Repositories;

public class AuthService : IAuthService
{
    private readonly AppDbContext _dbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;

    public AuthService(AppDbContext dbContext, IPasswordHasher passwordHasher, ITokenService tokenService)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _tokenService = tokenService;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken)
    {
        var exists = await _dbContext.Users.AnyAsync(x => x.Email == request.Email.Trim().ToLower(), cancellationToken);
        if (exists) throw new InvalidOperationException("Email already in use.");

        var user = new User(
            request.Name,
            request.Email,
            request.Phone,
            _passwordHasher.Hash(request.Password),
            request.WorksWithProgramming,
            request.Goal,
            request.ExperienceLevel);

        var interests = await _dbContext.Technologies
            .Where(x => request.Interests.Contains(x.Name))
            .Select(x => x.Id)
            .ToListAsync(cancellationToken);

        foreach (var technologyId in interests)
        {
            user.Interests.Add(new UserInterest(user.Id, technologyId));
        }

        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var token = _tokenService.CreateToken(user);
        return new AuthResponse(token.token, token.expiresAtUtc, user.Id, user.Name, user.Email);
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == request.Email.Trim().ToLower(), cancellationToken)
            ?? throw new UnauthorizedAccessException("Invalid credentials.");

        var valid = _passwordHasher.Verify(request.Password, user.PasswordHash);
        if (!valid) throw new UnauthorizedAccessException("Invalid credentials.");

        var token = _tokenService.CreateToken(user);
        return new AuthResponse(token.token, token.expiresAtUtc, user.Id, user.Name, user.Email);
    }

    public async Task RequestPasswordResetAsync(ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await FindByEmailOrPhone(request.Email, request.Phone, cancellationToken);
        if (user is null) return;

        var code = Random.Shared.Next(100000, 999999).ToString();
        _dbContext.PasswordResetTokens.Add(new PasswordResetToken(user.Id, code, DateTime.UtcNow.AddMinutes(15)));
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<bool> VerifyResetCodeAsync(VerifyResetCodeRequest request, CancellationToken cancellationToken)
    {
        var user = await FindByEmailOrPhone(request.Email, request.Phone, cancellationToken);
        if (user is null) return false;

        return await _dbContext.PasswordResetTokens.AnyAsync(
            x => x.UserId == user.Id && x.Code == request.Code && !x.Used && x.ExpiresAtUtc > DateTime.UtcNow,
            cancellationToken);
    }

    public async Task ResetPasswordAsync(ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        var user = await FindByEmailOrPhone(request.Email, request.Phone, cancellationToken)
            ?? throw new InvalidOperationException("User not found.");

        var token = await _dbContext.PasswordResetTokens
            .Where(x => x.UserId == user.Id && x.Code == request.Code && !x.Used && x.ExpiresAtUtc > DateTime.UtcNow)
            .OrderByDescending(x => x.ExpiresAtUtc)
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new InvalidOperationException("Invalid reset code.");

        user.UpdatePassword(_passwordHasher.Hash(request.NewPassword));
        token.MarkAsUsed();

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private Task<User?> FindByEmailOrPhone(string? email, string? phone, CancellationToken cancellationToken)
    {
        var normalizedEmail = email?.Trim().ToLowerInvariant();
        var normalizedPhone = phone?.Trim();

        return _dbContext.Users.FirstOrDefaultAsync(
            x => (!string.IsNullOrWhiteSpace(normalizedEmail) && x.Email == normalizedEmail)
              || (!string.IsNullOrWhiteSpace(normalizedPhone) && x.Phone == normalizedPhone),
            cancellationToken);
    }
}
