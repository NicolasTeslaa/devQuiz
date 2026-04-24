namespace DevQuiz.Domain.Entities;

public class PasswordResetToken : BaseEntity
{
    public Guid UserId { get; private set; }
    public string Code { get; private set; } = string.Empty;
    public DateTime ExpiresAtUtc { get; private set; }
    public bool Used { get; private set; }

    public User User { get; private set; } = null!;

    private PasswordResetToken() { }

    public PasswordResetToken(Guid userId, string code, DateTime expiresAtUtc)
    {
        UserId = userId;
        Code = code;
        ExpiresAtUtc = expiresAtUtc;
    }

    public void MarkAsUsed() => Used = true;
}
