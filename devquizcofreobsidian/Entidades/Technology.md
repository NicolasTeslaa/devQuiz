# Entidade - Technology

Arquivo: `backend/DevQuiz.Domain/Entities/Technology.cs`

## Campos
- `Id: Guid`
- `Name: string`

## Relacoes
- `Technology (1) -> (N) Question`
- `Technology (1) -> (N) UserInterest`

## Regras atuais
- `Name` e tratado com `Trim()`.
