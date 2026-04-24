# Entidade - QuizAttempt

Arquivo: `backend/DevQuiz.Domain/Entities/QuizAttempt.cs`

## Campos
- `Id: Guid`
- `UserId: Guid`
- `StartedAtUtc: DateTime`
- `FinishedAtUtc: DateTime`
- `Score: int`
- `TotalQuestions: int`
- `Percentage: decimal`

## Relacoes
- `QuizAttempt (N) -> (1) User`
- `QuizAttempt (1) -> (N) QuizAnswer`

## Regras atuais
- `Percentage` e calculado a partir de `Score/TotalQuestions`.
