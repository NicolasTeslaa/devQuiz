# 02 - Entidades de Dominio

## Entidades centrais

### User
Arquivo: `backend/DevQuiz.Domain/Entities/User.cs`

Campos principais:
- `Id: Guid`
- `Name`
- `Email`
- `Phone`
- `PasswordHash`
- `WorksWithProgramming: bool?`
- `Goal: string?`
- `ExperienceLevel: int?` (enum logico: Iniciante=1, Junior=2, Pleno=3, Senior=4)

Relacoes:
- `User -> UserInterest` (N:N com Technology)
- `User -> QuizAttempt` (1:N)

### Technology
Arquivo: `backend/DevQuiz.Domain/Entities/Technology.cs`

Campos:
- `Id: Guid`
- `Name`

Relacoes:
- `Technology -> Question` (1:N)
- `Technology <-> User` via `UserInterest` (N:N)

### Question
Arquivo: `backend/DevQuiz.Domain/Entities/Question.cs`

Campos:
- `Id: Guid` (PK interna)
- `ExternalId: int` (id externo/origem)
- `TechnologyId: Guid` (FK obrigatoria)
- `ExperienceLevel: ExperienceLevel` (obrigatorio)
- `Text`
- `OptionA/OptionB/OptionC/OptionD`
- `CorrectAnswer`

Relacoes:
- `Question -> Technology` (N:1)
- `Question -> QuizAnswer` (1:N logico)

### QuizAttempt
Arquivo: `backend/DevQuiz.Domain/Entities/QuizAttempt.cs`

Campos:
- `Id`
- `UserId`
- `StartedAtUtc`
- `FinishedAtUtc`
- `Score`
- `TotalQuestions`
- `Percentage`

Relacoes:
- `QuizAttempt -> User` (N:1)
- `QuizAttempt -> QuizAnswer` (1:N)

### QuizAnswer
Arquivo: `backend/DevQuiz.Domain/Entities/QuizAnswer.cs`

Campos:
- `Id`
- `AttemptId`
- `QuestionId`
- `SelectedAnswer`
- `IsCorrect`

### PasswordResetToken
Arquivo: `backend/DevQuiz.Domain/Entities/PasswordResetToken.cs`

Campos:
- `Id`
- `UserId`
- `Code`
- `ExpiresAtUtc`
- `Used`

## Enum de nivel
Arquivo: `backend/DevQuiz.Domain/Enums/ExperienceLevel.cs`
- `Iniciante = 1`
- `Junior = 2`
- `Pleno = 3`
- `Senior = 4`

## Regra funcional atual
Endpoint de perguntas filtra por nivel do usuario autenticado:
- Usuario `Pleno` recebe somente perguntas `Pleno`.
- Mesmo comportamento para os demais niveis.
