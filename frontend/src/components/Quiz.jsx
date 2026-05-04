import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";
import ResultScreen from "./ResultScreen";
import { api } from "../services/api";

const SELECTED_TECHNOLOGIES_KEY = "devquiz_selected_technologies";

function getStoredTechnologySelection() {
  const raw = localStorage.getItem(SELECTED_TECHNOLOGIES_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function Quiz() {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnologyIds, setSelectedTechnologyIds] = useState(getStoredTechnologySelection);
  const [isSubjectPanelOpen, setIsSubjectPanelOpen] = useState(false);
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
        const [questionData, technologyData] = await Promise.all([
          api.getQuestions(),
          api.getTechnologies(),
        ]);

        const normalized = (Array.isArray(questionData) ? questionData : []).map((item) => ({
          id: item.id,
          externalId: item.externalId,
          technologyId: item.technologyId,
          technologyName: item.technologyName,
          experienceLevel: item.experienceLevel,
          question: item.question,
          options: item.options,
        }));

        setAllQuestions(normalized);
        setTechnologies(Array.isArray(technologyData) ? technologyData : []);
      } catch (loadError) {
        setError(loadError.message ?? "Nao foi possivel carregar as perguntas.");
      } finally {
        setIsLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const activeTechnologyIds = selectedTechnologyIds.filter((id) =>
    technologies.some((technology) => technology.id === id),
  );

  const questions = activeTechnologyIds.length > 0
    ? allQuestions.filter((question) => activeTechnologyIds.includes(question.technologyId))
    : allQuestions;

  const selectedSubjectLabel = activeTechnologyIds.length > 0
    ? `${activeTechnologyIds.length} assunto${activeTechnologyIds.length > 1 ? "s" : ""}`
    : "Todos os assuntos";

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find((answer) => answer.questionId === currentQuestion?.id);
  const isCurrentQuestionAnswered = Boolean(currentAnswer);

  function resetQuizProgress() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setAnswers([]);
    setSummary(null);
    setShowResults(false);
    setError("");
  }

  function toggleTechnology(technologyId) {
    setSelectedTechnologyIds((previousIds) => {
      const nextIds = previousIds.includes(technologyId)
        ? previousIds.filter((id) => id !== technologyId)
        : [...previousIds, technologyId];

      localStorage.setItem(SELECTED_TECHNOLOGIES_KEY, JSON.stringify(nextIds));
      return nextIds;
    });

    resetQuizProgress();
  }

  function selectAllTechnologies() {
    localStorage.removeItem(SELECTED_TECHNOLOGIES_KEY);
    setSelectedTechnologyIds([]);
    resetQuizProgress();
  }

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
    resetQuizProgress();
  }

  const navbar = (
    <nav className="quiz-navbar" aria-label="Navegacao do quiz">
      <button type="button" className="nav-brand" onClick={() => navigate("/")}>DevQuiz</button>
      <div className="nav-actions">
        <button type="button" className="nav-button" onClick={() => navigate("/")}>Inicio</button>
        <button
          type="button"
          className="nav-button"
          onClick={() => setIsSubjectPanelOpen((isOpen) => !isOpen)}
        >
          Assuntos: {selectedSubjectLabel}
        </button>
      </div>

      {isSubjectPanelOpen ? (
        <section className="subject-panel" aria-label="Selecionar assuntos">
          <div className="subject-panel-header">
            <div>
              <strong>Assuntos do quiz</strong>
              <span>Escolha uma ou mais tecnologias para filtrar as perguntas.</span>
            </div>
            <button type="button" className="text-button" onClick={selectAllTechnologies}>Usar todos</button>
          </div>

          <div className="subject-grid">
            {technologies.map((technology) => {
              const isSelected = activeTechnologyIds.includes(technology.id);

              return (
                <label key={technology.id} className={`subject-option ${isSelected ? "selected" : ""}`}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleTechnology(technology.id)}
                  />
                  <span>{technology.name}</span>
                </label>
              );
            })}
          </div>
        </section>
      ) : null}
    </nav>
  );

  if (isLoading) {
    return (
      <main className="app-shell">
        {navbar}
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
        {navbar}
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
        {navbar}
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
      {navbar}
      <header className="hero">
        <p className="eyebrow">DevQuiz</p>
        <p>Responda uma pergunta por vez e acompanhe o progresso ate o resultado final.</p>
        <p className="subject-summary">Filtro atual: {selectedSubjectLabel}.</p>
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
