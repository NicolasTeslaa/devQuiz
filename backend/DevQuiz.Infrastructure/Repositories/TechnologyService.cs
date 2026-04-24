using DevQuiz.Application.Dtos.Technology;
using DevQuiz.Application.Interfaces;
using DevQuiz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DevQuiz.Infrastructure.Repositories;

public class TechnologyService : ITechnologyService
{
    private readonly AppDbContext _dbContext;

    public TechnologyService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyCollection<TechnologyResponse>> GetAllAsync(CancellationToken cancellationToken)
    {
        return await _dbContext.Technologies
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .Select(x => new TechnologyResponse(x.Id, x.Name))
            .ToListAsync(cancellationToken);
    }
}
