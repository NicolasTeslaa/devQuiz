# DevQuiz

Aplicacao frontend em React para quiz de perguntas e respostas com leitura de um arquivo JSON local.

## Como rodar

```bash
npm install
npm run dev
```

Para gerar a versao de producao:

```bash
npm run build
```

## Onde adicionar novas perguntas

Edite o arquivo `public/data/questions.json`.

Cada pergunta deve seguir este formato:

```json
{
  "id": 6,
  "question": "Texto da pergunta",
  "options": ["Opcao A", "Opcao B", "Opcao C", "Opcao D"],
  "correctAnswer": "Opcao B"
}
```
