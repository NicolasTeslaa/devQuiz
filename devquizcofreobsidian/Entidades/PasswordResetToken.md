# Entidade - PasswordResetToken

Arquivo: `backend/DevQuiz.Domain/Entities/PasswordResetToken.cs`

## Campos
- `Id: Guid`
- `UserId: Guid`
- `Code: string`
- `ExpiresAtUtc: DateTime`
- `Used: bool`

## Relacoes
- `PasswordResetToken (N) -> (1) User`

## Regras atuais
- Codigo deve estar valido, nao expirado e nao utilizado para reset de senha.
