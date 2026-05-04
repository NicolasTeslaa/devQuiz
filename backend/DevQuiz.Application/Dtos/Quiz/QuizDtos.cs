namespace DevQuiz.Application.Dtos.Quiz;

public record QuestionResponse(
    Guid Id,
    int ExternalId,
    Guid TechnologyId,
    string TechnologyName,
    int ExperienceLevel,
    string Question,
    IReadOnlyList<string> Options
);

public record AttemptAnswerRequest(Guid QuestionId, string SelectedAnswer);

public record SubmitAttemptRequest(IReadOnlyCollection<AttemptAnswerRequest> Answers);

public record AttemptResponse(Guid AttemptId, int Score, int TotalQuestions, decimal Percentage, decimal FinalGrade, DateTime FinishedAtUtc);

public record AttemptHistoryItem(Guid AttemptId, int Score, int TotalQuestions, decimal Percentage, decimal FinalGrade, DateTime FinishedAtUtc);

public record AttemptDetailResponse(
    Guid AttemptId,
    int Score,
    int TotalQuestions,
    decimal Percentage,
    decimal FinalGrade,
    DateTime FinishedAtUtc,
    IReadOnlyCollection<AttemptQuestionDetail> Answers
);

public record AttemptQuestionDetail(
    Guid QuestionId,
    int ExternalId,
    string TechnologyName,
    string Question,
    string SelectedAnswer,
    string CorrectAnswer,
    bool IsCorrect
);
