namespace DevQuiz.Domain.Entities;

public class UserInterest
{
    public Guid UserId { get; private set; }
    public Guid TechnologyId { get; private set; }

    public User User { get; private set; } = null!;
    public Technology Technology { get; private set; } = null!;

    private UserInterest() { }

    public UserInterest(Guid userId, Guid technologyId)
    {
        UserId = userId;
        TechnologyId = technologyId;
    }
}
