import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import ResultScreen from "./ResultScreen";
import { api } from "../services/api";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoading(true);
        setError("");
        const data = await api.getQuestions();

        const normalized = (Array.isArray(data) ? data : []).map((item) => ({
          id: item.id,
          externalId: item.externalId,
          question: item.question,
          options: item.options,
        }));

        setQuestions(normalized);
      } catch (loadError) {
        setError(loadError.message ?? "Nao foi possivel carregar as perguntas.");
      } finally {
        setIsLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find((answer) => answer.questionId === currentQuestion?.id);
  const isCurrentQuestionAnswered = Boolean(currentAnswer);

  function handleSubmitAnswer() {
    if (!currentQuestion || !selectedAnswer) return;

    const answerPayload = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer,
    };

    setAnswers((previousAnswers) => [...previousAnswers, answerPayload]);
  }

  async function handleNextQuestion() {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      try {
        const response = await api.submitAttempt({
          answers: answers.map((answer) => ({ questionId: answer.questionId, selectedAnswer: answer.selectedAnswer })),
        });
        setSummary(response);
      } catch (submitError) {
        setError(submitError.message ?? "Nao foi possivel enviar o resultado.");
      }

      setShowResults(true);
      return;
    }

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer("");
  }

  function handleRestartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setSummary(null);
    setShowResults(false);
    setError("");
  }

  if (isLoading) {
    return (
      <main className="app-shell">
        <section className="card status-card">
          <span className="question-tag">Carregando</span>
          <h1>Preparando o quiz...</h1>
          <p>As perguntas estao sendo carregadas da API.</p>
        </section>
      </main>
    );
  }

  if (error || questions.length === 0) {
    return (
      <main className="app-shell">
        <section className="card status-card">
          <span className="question-tag">Falha no carregamento</span>
          <h1>Nao foi possivel iniciar o quiz</h1>
          <p>{error || "Nenhuma pergunta foi encontrada."}</p>
        </section>
      </main>
    );
  }

  if (showResults) {
    return (
      <main className="app-shell">
        <header className="hero">
          <p className="eyebrow">DevQuiz</p>
          <h1>Resumo completo da tentativa</h1>
          <p>Resultado consolidado com nota final e aproveitamento.</p>
        </header>

        <ResultScreen questions={questions} answers={answers} summary={summary} onRestart={handleRestartQuiz} />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">DevQuiz</p>
        <p>Responda uma pergunta por vez e acompanhe o progresso ate o resultado final.</p>
      </header>

      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        isAnswered={isCurrentQuestionAnswered}
        onSelectAnswer={setSelectedAnswer}
        onSubmitAnswer={handleSubmitAnswer}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    </main>
  );
}

export default Quiz;
