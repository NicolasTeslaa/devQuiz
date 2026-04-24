# DevQuiz - Base de conhecimento

Este cofre documenta o estado atual do projeto **DevQuiz** para acelerar manutencao e evolucao.

## Comece por aqui
- [[01 - Arquitetura Geral]]
- [[02 - Entidades de Dominio]]
- [[03 - Contratos da API]]
- [[04 - Banco e Migracoes]]

## Contexto rapido
- Backend: monolito .NET 9 com DDD em camadas (Domain/Application/Infrastructure/API).
- Banco: MySQL com Entity Framework Core.
- Auth: JWT.
- Regras atuais de quiz:
  - Pergunta pertence a uma tecnologia.
  - Pergunta possui nivel de experiencia.
  - Usuario recebe perguntas do proprio nivel (`ExperienceLevel`).

## Estrutura de pastas (resumo)
- `backend/DevQuiz.Domain`
- `backend/DevQuiz.Application`
- `backend/DevQuiz.Infrastructure`
- `backend/DevQuiz.Api`
- `frontend/`
