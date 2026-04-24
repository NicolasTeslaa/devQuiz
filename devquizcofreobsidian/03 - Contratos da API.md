# 03 - Contratos da API

Base path: `/api`

## Auth
Controller: `backend/DevQuiz.Api/Controllers/AuthController.cs`

### `POST /api/auth/register`
Cria usuario e retorna token JWT.

Request (resumo):
- `name`
- `email`
- `phone`
- `password`
- `worksWithProgramming`
- `experienceLevel`
- `goal`
- `interests: string[]`

Response:
- `accessToken`
- `expiresAtUtc`
- `userId`
- `name`
- `email`

### `POST /api/auth/login`
Autentica usuario e retorna token JWT.

### `POST /api/auth/forgot-password/request`
Solicita codigo de reset por email/telefone.

### `POST /api/auth/forgot-password/verify`
Valida codigo de reset.

### `POST /api/auth/forgot-password/reset`
Troca senha usando codigo valido.

## Technologies
Controller: `backend/DevQuiz.Api/Controllers/TechnologiesController.cs`

### `GET /api/technologies`
Lista tecnologias disponiveis.

## Quiz
Controller: `backend/DevQuiz.Api/Controllers/QuizController.cs`

### `GET /api/quiz/questions` (Authorize)
Retorna perguntas filtradas pelo `ExperienceLevel` do usuario autenticado.

Response por item:
- `id`
- `externalId`
- `technologyId`
- `technologyName`
- `experienceLevel`
- `question`
- `options[]`

### `POST /api/quiz/attempts` (Authorize)
Envia tentativa de quiz.

Request:
- `answers: [{ questionId, selectedAnswer }]`

Response:
- `attemptId`
- `score`
- `totalQuestions`
- `percentage`
- `finalGrade`
- `finishedAtUtc`

### `GET /api/quiz/attempts/me` (Authorize)
Historico das tentativas do usuario autenticado.

## Erros
Tratamento central em `Program.cs`:
- `401` para `UnauthorizedAccessException`
- `400` para `InvalidOperationException`
- `500` demais casos
