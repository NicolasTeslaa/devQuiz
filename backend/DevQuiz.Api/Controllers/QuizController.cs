using System.Security.Claims;
using DevQuiz.Application.Dtos.Quiz;
using DevQuiz.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevQuiz.Api.Controllers;

[ApiController]
[Route("api/quiz")]
public class QuizController : ControllerBase
{
    private readonly IQuizService _quizService;

    public QuizController(IQuizService quizService)
    {
        _quizService = quizService;
    }

    [Authorize]
    [HttpGet("questions")]
    public async Task<ActionResult<IReadOnlyCollection<QuestionResponse>>> GetQuestions(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var result = await _quizService.GetQuestionsAsync(userId, cancellationToken);
        return Ok(result);
    }

    [Authorize]
    [HttpPost("attempts")]
    public async Task<ActionResult<AttemptResponse>> Submit(SubmitAttemptRequest request, CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var result = await _quizService.SubmitAttemptAsync(userId, request, cancellationToken);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("attempts/me")]
    public async Task<ActionResult<IReadOnlyCollection<AttemptHistoryItem>>> History(CancellationToken cancellationToken)
    {
        var userId = GetUserId();
        var result = await _quizService.GetMyAttemptsAsync(userId, cancellationToken);
        return Ok(result);
    }

    private Guid GetUserId()
    {
        var sub = User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? User.FindFirstValue("sub")
            ?? throw new UnauthorizedAccessException("Invalid token subject.");

        return Guid.Parse(sub);
    }
}
