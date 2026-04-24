# Entidade - ExperienceLevel (Enum)

Arquivo: `backend/DevQuiz.Domain/Enums/ExperienceLevel.cs`

## Valores
- `Iniciante = 1`
- `Junior = 2`
- `Pleno = 3`
- `Senior = 4`

## Uso atual
- Definido no usuario (`User.ExperienceLevel`).
- Definido na pergunta (`Question.ExperienceLevel`).
- Filtra perguntas de quiz por nivel do usuario autenticado.
