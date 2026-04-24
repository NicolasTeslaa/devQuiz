# Entidade - UserInterest

Arquivo: `backend/DevQuiz.Domain/Entities/UserInterest.cs`

## Campos
- `UserId: Guid`
- `TechnologyId: Guid`

## Relacoes
- `UserInterest (N) -> (1) User`
- `UserInterest (N) -> (1) Technology`

## Observacoes
- Tabela de associacao N:N entre usuario e tecnologia.
- Chave composta: `UserId + TechnologyId`.
