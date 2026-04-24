namespace DevQuiz.Domain.Entities;

public class QuizAnswer : BaseEntity
{
    public Guid AttemptId { get; private set; }
    public Guid QuestionId { get; private set; }
    public string SelectedAnswer { get; private set; } = string.Empty;
    public bool IsCorrect { get; private set; }

    public QuizAttempt Attempt { get; private set; } = null!;
    public Question Question { get; private set; } = null!;

    private QuizAnswer() { }

    public QuizAnswer(Guid attemptId, Guid questionId, string selectedAnswer, bool isCorrect)
    {
        AttemptId = attemptId;
        QuestionId = questionId;
        SelectedAnswer = selectedAnswer;
        IsCorrect = isCorrect;
    }
}
