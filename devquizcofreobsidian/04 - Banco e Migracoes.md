# 04 - Banco e Migracoes

## Contexto e mapeamento
- `AppDbContext`: `backend/DevQuiz.Infrastructure/Data/AppDbContext.cs`
- Provider: Pomelo MySQL + EF Core.
- Relacoes chave:
  - `Question.TechnologyId` (obrigatoria)
  - `Question.ExperienceLevel` (obrigatorio)

## Migrations existentes
Pasta: `backend/DevQuiz.Infrastructure/Migrations`

- `InitialCreate`
- `AddQuestionTechnologyRelation`
- `AddQuestionExperienceLevel`

## Comandos uteis
No diretorio `backend/`:

```powershell
dotnet ef migrations add NomeDaMigration --project DevQuiz.Infrastructure --startup-project DevQuiz.Api
dotnet ef database update --project DevQuiz.Infrastructure --startup-project DevQuiz.Api
```

## Seed de dados
Arquivo: `backend/DevQuiz.Infrastructure/Seeding/DataSeeder.cs`

- Garante tecnologias base.
- Importa perguntas do `frontend/public/data/questions.json`.
- Resolve automaticamente:
  - Tecnologia da pergunta.
  - Nivel de experiencia da pergunta.

## Checklist antes de subir alteracao de dominio
1. Atualizar entidade em `Domain`.
2. Atualizar mapeamento no `AppDbContext`.
3. Gerar migration nova.
4. Ajustar seed (se necessario).
5. Ajustar DTO/servico/controller impactados.
6. Atualizar as notas [[02 - Entidades de Dominio]] e [[03 - Contratos da API]].
