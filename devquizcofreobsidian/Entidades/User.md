# Entidade - User

Arquivo: `backend/DevQuiz.Domain/Entities/User.cs`

## Campos
- `Id: Guid`
- `Name: string`
- `Email: string`
- `Phone: string?`
- `PasswordHash: string`
- `WorksWithProgramming: bool?`
- `Goal: string?`
- `ExperienceLevel: int?`

## Relacoes
- `User (1) -> (N) QuizAttempt`
- `User (1) -> (N) UserInterest`

## Regras atuais
- Email e normalizado para minusculo no construtor.
- Senha e persistida apenas como hash.
