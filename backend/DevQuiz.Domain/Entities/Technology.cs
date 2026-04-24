namespace DevQuiz.Domain.Entities;

public class Technology : BaseEntity
{
    public string Name { get; private set; } = string.Empty;
    public ICollection<Question> Questions { get; private set; } = new List<Question>();

    private Technology() { }

    public Technology(string name)
    {
        Name = name.Trim();
    }
}
