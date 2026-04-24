# 01 - Arquitetura Geral

## Visao
O backend segue separacao por camadas inspirada em DDD:

1. **Domain**
- Entidades e regras centrais do negocio.
- Nao depende de infraestrutura.

2. **Application**
- DTOs, contratos de servico e orquestracao de casos de uso.
- Fala com Domain e e implementado pela Infrastructure.

3. **Infrastructure**
- EF Core (MySQL), implementacoes de servicos, JWT, hash de senha, seed.

4. **Api**
- Controllers HTTP, pipeline ASP.NET Core, CORS, autenticacao/autorizacao.

## Fluxo de requisicao (alto nivel)
1. Request chega em `DevQuiz.Api` (Controller).
2. Controller chama interface da `Application`.
3. Implementacao concreta na `Infrastructure` executa regras + persistencia.
4. Resultado volta como DTO JSON.

## Arquivos principais
- Bootstrap API: `backend/DevQuiz.Api/Program.cs`
- DI infra: `backend/DevQuiz.Infrastructure/DependencyInjection/ServiceCollectionExtensions.cs`
- Contexto EF: `backend/DevQuiz.Infrastructure/Data/AppDbContext.cs`

## Regras arquiteturais praticas
- Evitar logica de negocio dentro de Controllers.
- Nao acessar `DbContext` direto na API.
- Toda alteracao de contrato deve refletir em:
  1. DTO (`Application`)
  2. Service (`Infrastructure`)
  3. Controller (`Api`)
  4. Nota [[03 - Contratos da API]]
