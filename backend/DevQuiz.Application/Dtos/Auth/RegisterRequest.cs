namespace DevQuiz.Application.Dtos.Auth;

public record RegisterRequest(
    string Name,
    string Email,
    string? Phone,
    string Password,
    bool? WorksWithProgramming,
    int? ExperienceLevel,
    string? Goal,
    IReadOnlyCollection<string> Interests
);
