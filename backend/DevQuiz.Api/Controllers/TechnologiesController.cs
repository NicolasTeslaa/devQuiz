using DevQuiz.Application.Dtos.Technology;
using DevQuiz.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DevQuiz.Api.Controllers;

[ApiController]
[Route("api/technologies")]
public class TechnologiesController : ControllerBase
{
    private readonly ITechnologyService _technologyService;

    public TechnologiesController(ITechnologyService technologyService)
    {
        _technologyService = technologyService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<TechnologyResponse>>> Get(CancellationToken cancellationToken)
    {
        var result = await _technologyService.GetAllAsync(cancellationToken);
        return Ok(result);
    }
}
