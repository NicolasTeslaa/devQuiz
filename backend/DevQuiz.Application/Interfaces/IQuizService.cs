using DevQuiz.Application.Dtos.Quiz;

namespace DevQuiz.Application.Interfaces;

public interface IQuizService
{
    Task<IReadOnlyCollection<QuestionResponse>> GetQuestionsAsync(Guid userId, CancellationToken cancellationToken);
    Task<AttemptResponse> SubmitAttemptAsync(Guid userId, SubmitAttemptRequest request, CancellationToken cancellationToken);
    Task<IReadOnlyCollection<AttemptHistoryItem>> GetMyAttemptsAsync(Guid userId, CancellationToken cancellationToken);
}
