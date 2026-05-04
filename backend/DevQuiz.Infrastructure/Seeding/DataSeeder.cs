using System.Text.Json;
using DevQuiz.Domain.Entities;
using DevQuiz.Domain.Enums;
using DevQuiz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DevQuiz.Infrastructure.Seeding;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext dbContext, string contentRootPath, CancellationToken cancellationToken = default)
    {
        await dbContext.Database.MigrateAsync(cancellationToken);

        if (!await dbContext.Technologies.AnyAsync(cancellationToken))
        {
            var technologies = new[] { "HTML", "CSS", "JavaScript", "React", "SQL", "Git", "APIs REST", "C#", "Typescript", "Arquitetura" };
            dbContext.Technologies.AddRange(technologies.Select(x => new Technology(x)));
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        if (!await dbContext.Questions.AnyAsync(cancellationToken))
        {
            var configuredQuestionFile = Environment.GetEnvironmentVariable("Seed__QuestionsPath");
            var questionFile = !string.IsNullOrWhiteSpace(configuredQuestionFile)
                ? configuredQuestionFile
                : Path.GetFullPath(Path.Combine(contentRootPath, "..", "..", "frontend", "public", "data", "questions.json"));

            if (File.Exists(questionFile))
            {
                var json = await File.ReadAllTextAsync(questionFile, cancellationToken);
                var payload = JsonSerializer.Deserialize<List<QuestionSeed>>(json) ?? [];
                var technologies = await dbContext.Technologies
                    .AsNoTracking()
                    .ToDictionaryAsync(x => x.Name, x => x.Id, cancellationToken);

                var entities = payload
                    .Where(x => x.Options is { Count: 4 })
                    .Select(x =>
                    {
                        var technologyId = ResolveTechnologyId(x.Question, technologies);
                        var level = ResolveExperienceLevel(x.Question);
                        return new Question(technologyId, level, x.Id, x.Question, x.Options!, x.CorrectAnswer);
                    })
                    .ToList();

                dbContext.Questions.AddRange(entities);
                await dbContext.SaveChangesAsync(cancellationToken);
            }
        }
        else
        {
            var existingQuestions = await dbContext.Questions.ToListAsync(cancellationToken);
            var hasChanges = false;

            foreach (var question in existingQuestions)
            {
                var expectedLevel = ResolveExperienceLevel(question.Text);
                if (question.ExperienceLevel != expectedLevel)
                {
                    dbContext.Entry(question).Property(x => x.ExperienceLevel).CurrentValue = expectedLevel;
                    hasChanges = true;
                }
            }

            if (hasChanges)
            {
                await dbContext.SaveChangesAsync(cancellationToken);
            }
        }
    }

    private static Guid ResolveTechnologyId(string questionText, IReadOnlyDictionary<string, Guid> technologies)
    {
        var normalized = questionText.ToLowerInvariant();

        if (normalized.Contains("react")) return technologies["React"];
        if (normalized.Contains("next.js")) return technologies["React"];
        if (normalized.Contains("asp.net") || normalized.Contains("c#")) return technologies["C#"];
        if (normalized.Contains("sql") || normalized.Contains("postgresql") || normalized.Contains("sql server")) return technologies["SQL"];
        if (normalized.Contains("aws") || normalized.Contains("api")) return technologies["APIs REST"];
        if (normalized.Contains("github actions") || normalized.Contains("ci/cd")) return technologies["Git"];
        if (normalized.Contains("git")) return technologies["Git"];
        if (normalized.Contains("javascript")) return technologies["JavaScript"];
        if (normalized.Contains("arquitet")) return technologies["Arquitetura"];

        return technologies["Arquitetura"];
    }

    private static ExperienceLevel ResolveExperienceLevel(string questionText)
    {
        var normalized = questionText.ToLowerInvariant();

        if (normalized.Contains("senior"))
        {
            return ExperienceLevel.Senior;
        }

        if (normalized.Contains("arquitet") ||
            normalized.Contains("resil") ||
            normalized.Contains("observabilidade") ||
            normalized.Contains("consistency") ||
            normalized.Contains("consistencia"))
        {
            return ExperienceLevel.Pleno;
        }

        if (normalized.Contains("react") ||
            normalized.Contains("next.js") ||
            normalized.Contains("aws") ||
            normalized.Contains("ci/cd") ||
            normalized.Contains("entity framework"))
        {
            return ExperienceLevel.Junior;
        }

        return ExperienceLevel.Iniciante;
    }

    private sealed record QuestionSeed(int Id, string Question, List<string>? Options, string CorrectAnswer);
}
