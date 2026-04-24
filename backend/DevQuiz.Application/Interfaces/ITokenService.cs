using DevQuiz.Domain.Entities;

namespace DevQuiz.Application.Interfaces;

public interface ITokenService
{
    (string token, DateTime expiresAtUtc) CreateToken(User user);
}
