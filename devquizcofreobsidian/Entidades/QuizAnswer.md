# Entidade - QuizAnswer

Arquivo: `backend/DevQuiz.Domain/Entities/QuizAnswer.cs`

## Campos
- `Id: Guid`
- `AttemptId: Guid`
- `QuestionId: Guid`
- `SelectedAnswer: string`
- `IsCorrect: bool`

## Relacoes
- `QuizAnswer (N) -> (1) QuizAttempt`
- `QuizAnswer (N) -> (1) Question`

## Observacoes
- Guarda cada resposta enviada em uma tentativa.
