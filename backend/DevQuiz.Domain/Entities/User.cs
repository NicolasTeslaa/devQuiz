namespace DevQuiz.Domain.Entities;

public class User : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string? Phone { get; private set; }
    public string PasswordHash { get; private set; } = string.Empty;
    public bool? WorksWithProgramming { get; private set; }
    public string? Goal { get; private set; }
    public int? ExperienceLevel { get; private set; }

    public ICollection<UserInterest> Interests { get; private set; } = new List<UserInterest>();
    public ICollection<QuizAttempt> Attempts { get; private set; } = new List<QuizAttempt>();

    private User() { }

    public User(string name, string email, string? phone, string passwordHash, bool? worksWithProgramming, string? goal, int? experienceLevel)
    {
        Name = name.Trim();
        Email = email.Trim().ToLowerInvariant();
        Phone = phone;
        PasswordHash = passwordHash;
        WorksWithProgramming = worksWithProgramming;
        Goal = goal;
        ExperienceLevel = experienceLevel;
    }

    public void UpdatePassword(string hash) => PasswordHash = hash;
}
