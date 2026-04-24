using DevQuiz.Domain.Enums;

namespace DevQuiz.Domain.Entities;

public class Question : BaseEntity
{
    public Guid TechnologyId { get; private set; }
    public ExperienceLevel ExperienceLevel { get; private set; }
    public int ExternalId { get; private set; }
    public string Text { get; private set; } = string.Empty;
    public string OptionA { get; private set; } = string.Empty;
    public string OptionB { get; private set; } = string.Empty;
    public string OptionC { get; private set; } = string.Empty;
    public string OptionD { get; private set; } = string.Empty;
    public string CorrectAnswer { get; private set; } = string.Empty;
    public Technology Technology { get; private set; } = null!;

    private Question() { }

    public Question(
        Guid technologyId,
        ExperienceLevel experienceLevel,
        int externalId,
        string text,
        IReadOnlyList<string> options,
        string correctAnswer)
    {
        TechnologyId = technologyId;
        ExperienceLevel = experienceLevel;
        ExternalId = externalId;
        Text = text;
        OptionA = options[0];
        OptionB = options[1];
        OptionC = options[2];
        OptionD = options[3];
        CorrectAnswer = correctAnswer;
    }

    public IReadOnlyList<string> Options() => [OptionA, OptionB, OptionC, OptionD];
}
