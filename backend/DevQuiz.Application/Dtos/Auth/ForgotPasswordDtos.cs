namespace DevQuiz.Application.Dtos.Auth;

public record ForgotPasswordRequest(string? Email, string? Phone);
public record VerifyResetCodeRequest(string Code, string? Email, string? Phone);
public record ResetPasswordRequest(string Code, string NewPassword, string? Email, string? Phone);
