namespace DevQuiz.Application.Dtos.Auth;

public record AuthResponse(string AccessToken, DateTime ExpiresAtUtc, Guid UserId, string Name, string Email);
