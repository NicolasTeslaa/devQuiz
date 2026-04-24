using System.Security.Claims;
using DevQuiz.Application.Dtos.Auth;
using DevQuiz.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DevQuiz.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request, CancellationToken cancellationToken)
    {
        var result = await _authService.RegisterAsync(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await _authService.LoginAsync(request, cancellationToken);
        return Ok(result);
    }

    [HttpPost("forgot-password/request")]
    public async Task<IActionResult> RequestReset(ForgotPasswordRequest request, CancellationToken cancellationToken)
    {
        await _authService.RequestPasswordResetAsync(request, cancellationToken);
        return NoContent();
    }

    [HttpPost("forgot-password/verify")]
    public async Task<ActionResult<object>> Verify(VerifyResetCodeRequest request, CancellationToken cancellationToken)
    {
        var valid = await _authService.VerifyResetCodeAsync(request, cancellationToken);
        return Ok(new { valid });
    }

    [HttpPost("forgot-password/reset")]
    public async Task<IActionResult> Reset(ResetPasswordRequest request, CancellationToken cancellationToken)
    {
        await _authService.ResetPasswordAsync(request, cancellationToken);
        return NoContent();
    }
}
