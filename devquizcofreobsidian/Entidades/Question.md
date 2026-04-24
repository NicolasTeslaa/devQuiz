# Entidade - Question

Arquivo: `backend/DevQuiz.Domain/Entities/Question.cs`

## Campos
- `Id: Guid`
- `ExternalId: int`
- `TechnologyId: Guid`
- `ExperienceLevel: ExperienceLevel`
- `Text: string`
- `OptionA: string`
- `OptionB: string`
- `OptionC: string`
- `OptionD: string`
- `CorrectAnswer: string`

## Relacoes
- `Question (N) -> (1) Technology`
- `Question (1) -> (N) QuizAnswer`

## Regras atuais
- Toda pergunta deve estar vinculada a uma tecnologia.
- Toda pergunta deve ter nivel de experiencia.
- `ExternalId` representa id externo (origem/seed).
