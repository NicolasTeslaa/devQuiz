using DevQuiz.Application.Dtos.Technology;

namespace DevQuiz.Application.Interfaces;

public interface ITechnologyService
{
    Task<IReadOnlyCollection<TechnologyResponse>> GetAllAsync(CancellationToken cancellationToken);
}
