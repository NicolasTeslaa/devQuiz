using DevQuiz.Application.Dtos.Quiz;
using DevQuiz.Application.Interfaces;
using DevQuiz.Domain.Entities;
using DevQuiz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DevQuiz.Infrastructure.Repositories;

public class QuizService : IQuizService
{
    private readonly AppDbContext _dbContext;

    public QuizService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyCollection<QuestionResponse>> GetQuestionsAsync(Guid userId, CancellationToken cancellationToken)
    {
        var userLevel = await _dbContext.Users
            .AsNoTracking()
            .Where(x => x.Id == userId)
            .Select(x => x.ExperienceLevel)
            .FirstOrDefaultAsync(cancellationToken);

        var query = _dbContext.Questions
            .AsNoTracking()
            .AsQueryable();

        if (userLevel.HasValue)
        {
            query = query.Where(x => (int)x.ExperienceLevel == userLevel.Value);
        }

        return await query
            .OrderBy(x => x.ExternalId)
            .Select(x => new QuestionResponse(
                x.Id,
                x.ExternalId,
                x.TechnologyId,
                x.Technology.Name,
                (int)x.ExperienceLevel,
                x.Text,
                new[] { x.OptionA, x.OptionB, x.OptionC, x.OptionD }))
            .ToListAsync(cancellationToken);
    }

    public async Task<AttemptResponse> SubmitAttemptAsync(Guid userId, SubmitAttemptRequest request, CancellationToken cancellationToken)
    {
        var questions = await _dbContext.Questions
            .Where(x => request.Answers.Select(a => a.QuestionId).Contains(x.Id))
            .ToDictionaryAsync(x => x.Id, cancellationToken);

        var score = 0;
        var attempt = new QuizAttempt(userId, 0, request.Answers.Count);

        foreach (var answer in request.Answers)
        {
            if (!questions.TryGetValue(answer.QuestionId, out var question)) continue;

            var isCorrect = string.Equals(answer.SelectedAnswer.Trim(), question.CorrectAnswer.Trim(), StringComparison.Ordinal);
            if (isCorrect) score++;

            attempt.Answers.Add(new QuizAnswer(attempt.Id, question.Id, answer.SelectedAnswer, isCorrect));
        }

        attempt = new QuizAttempt(userId, score, request.Answers.Count);
        foreach (var answer in request.Answers)
        {
            if (!questions.TryGetValue(answer.QuestionId, out var question)) continue;
            var isCorrect = string.Equals(answer.SelectedAnswer.Trim(), question.CorrectAnswer.Trim(), StringComparison.Ordinal);
            attempt.Answers.Add(new QuizAnswer(attempt.Id, question.Id, answer.SelectedAnswer, isCorrect));
        }

        _dbContext.QuizAttempts.Add(attempt);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var finalGrade = request.Answers.Count > 0 ? Math.Round((decimal)score * 10 / request.Answers.Count, 1) : 0;
        return new AttemptResponse(attempt.Id, score, request.Answers.Count, attempt.Percentage, finalGrade, attempt.FinishedAtUtc);
    }

    public async Task<IReadOnlyCollection<AttemptHistoryItem>> GetMyAttemptsAsync(Guid userId, CancellationToken cancellationToken)
    {
        return await _dbContext.QuizAttempts
            .AsNoTracking()
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.FinishedAtUtc)
            .Select(x => new AttemptHistoryItem(
                x.Id,
                x.Score,
                x.TotalQuestions,
                x.Percentage,
                x.TotalQuestions > 0 ? Math.Round((decimal)x.Score * 10 / x.TotalQuestions, 1) : 0,
                x.FinishedAtUtc))
            .ToListAsync(cancellationToken);
    }
}
