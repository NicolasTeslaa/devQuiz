namespace DevQuiz.Domain.Entities;

public class QuizAttempt : BaseEntity
{
    public Guid UserId { get; private set; }
    public DateTime StartedAtUtc { get; private set; }
    public DateTime FinishedAtUtc { get; private set; }
    public int Score { get; private set; }
    public int TotalQuestions { get; private set; }
    public decimal Percentage { get; private set; }

    public User User { get; private set; } = null!;
    public ICollection<QuizAnswer> Answers { get; private set; } = new List<QuizAnswer>();

    private QuizAttempt() { }

    public QuizAttempt(Guid userId, int score, int totalQuestions)
    {
        UserId = userId;
        StartedAtUtc = DateTime.UtcNow;
        FinishedAtUtc = DateTime.UtcNow;
        Score = score;
        TotalQuestions = totalQuestions;
        Percentage = totalQuestions > 0 ? Math.Round((decimal)score * 100 / totalQuestions, 2) : 0;
    }
}
