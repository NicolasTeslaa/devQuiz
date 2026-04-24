using DevQuiz.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DevQuiz.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Technology> Technologies => Set<Technology>();
    public DbSet<UserInterest> UserInterests => Set<UserInterest>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<QuizAttempt> QuizAttempts => Set<QuizAttempt>();
    public DbSet<QuizAnswer> QuizAnswers => Set<QuizAnswer>();
    public DbSet<PasswordResetToken> PasswordResetTokens => Set<PasswordResetToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Email).HasMaxLength(180).IsRequired();
            entity.HasIndex(x => x.Email).IsUnique();
            entity.Property(x => x.Phone).HasMaxLength(20);
            entity.Property(x => x.PasswordHash).HasMaxLength(255).IsRequired();
        });

        modelBuilder.Entity<Technology>(entity =>
        {
            entity.ToTable("technologies");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Name).HasMaxLength(80).IsRequired();
            entity.HasIndex(x => x.Name).IsUnique();
        });

        modelBuilder.Entity<UserInterest>(entity =>
        {
            entity.ToTable("user_interests");
            entity.HasKey(x => new { x.UserId, x.TechnologyId });
            entity.HasOne(x => x.User).WithMany(x => x.Interests).HasForeignKey(x => x.UserId);
            entity.HasOne(x => x.Technology).WithMany().HasForeignKey(x => x.TechnologyId);
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.ToTable("questions");
            entity.HasKey(x => x.Id);
            entity.HasIndex(x => x.ExternalId).IsUnique();
            entity.HasIndex(x => x.TechnologyId);
            entity.HasIndex(x => x.ExperienceLevel);
            entity.HasOne(x => x.Technology).WithMany(x => x.Questions).HasForeignKey(x => x.TechnologyId);
            entity.Property(x => x.ExperienceLevel).HasConversion<int>().IsRequired();
            entity.Property(x => x.Text).HasColumnType("text").IsRequired();
            entity.Property(x => x.OptionA).HasColumnType("text").IsRequired();
            entity.Property(x => x.OptionB).HasColumnType("text").IsRequired();
            entity.Property(x => x.OptionC).HasColumnType("text").IsRequired();
            entity.Property(x => x.OptionD).HasColumnType("text").IsRequired();
            entity.Property(x => x.CorrectAnswer).HasColumnType("text").IsRequired();
        });

        modelBuilder.Entity<QuizAttempt>(entity =>
        {
            entity.ToTable("quiz_attempts");
            entity.HasKey(x => x.Id);
            entity.HasOne(x => x.User).WithMany(x => x.Attempts).HasForeignKey(x => x.UserId);
            entity.Property(x => x.Percentage).HasPrecision(5, 2);
        });

        modelBuilder.Entity<QuizAnswer>(entity =>
        {
            entity.ToTable("quiz_answers");
            entity.HasKey(x => x.Id);
            entity.HasOne(x => x.Attempt).WithMany(x => x.Answers).HasForeignKey(x => x.AttemptId);
            entity.HasOne(x => x.Question).WithMany().HasForeignKey(x => x.QuestionId);
            entity.Property(x => x.SelectedAnswer).HasColumnType("text").IsRequired();
        });

        modelBuilder.Entity<PasswordResetToken>(entity =>
        {
            entity.ToTable("password_reset_tokens");
            entity.HasKey(x => x.Id);
            entity.Property(x => x.Code).HasMaxLength(6).IsRequired();
            entity.HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId);
        });
    }
}
