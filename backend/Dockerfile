FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY backend/DevQuiz.Backend.sln backend/
COPY backend/DevQuiz.Api/DevQuiz.Api.csproj backend/DevQuiz.Api/
COPY backend/DevQuiz.Application/DevQuiz.Application.csproj backend/DevQuiz.Application/
COPY backend/DevQuiz.Domain/DevQuiz.Domain.csproj backend/DevQuiz.Domain/
COPY backend/DevQuiz.Infrastructure/DevQuiz.Infrastructure.csproj backend/DevQuiz.Infrastructure/

RUN dotnet restore backend/DevQuiz.Backend.sln

COPY backend backend
COPY frontend/public/data/questions.json seed/questions.json

RUN dotnet publish backend/DevQuiz.Api/DevQuiz.Api.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime

WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Production \
    Seed__QuestionsPath=/app/data/questions.json

COPY --from=build /app/publish .
COPY --from=build /src/seed/questions.json /app/data/questions.json

EXPOSE 8080

ENTRYPOINT ["dotnet", "DevQuiz.Api.dll"]
