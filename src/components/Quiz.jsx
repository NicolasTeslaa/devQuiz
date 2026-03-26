import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';

const QUESTIONS_URL = '/data/questions.json';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadQuestions() {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(QUESTIONS_URL);

        if (!response.ok) {
          throw new Error('Nao foi possivel carregar as perguntas.');
        }

        const data = await response.json();
        setQuestions(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (answer) => answer.questionId === currentQuestion?.id,
  );
  const isCurrentQuestionAnswered = Boolean(currentAnswer);

  function handleSubmitAnswer() {
    if (!currentQuestion || !selectedAnswer) {
      return;
    }

    const answerPayload = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: selectedAnswer === currentQuestion.correctAnswer,
    };

    setAnswers((previousAnswers) => [...previousAnswers, answerPayload]);
  }

  function handleNextQuestion() {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      setShowResults(true);
      return;
    }

    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer('');
  }

  function handleRestartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setAnswers([]);
    setShowResults(false);
    setError('');
  }

  if (isLoading) {
    return (
      <main className="app-shell">
        <section className="card status-card">
          <span className="question-tag">Carregando</span>
          <h1>Preparando o quiz...</h1>
          <p>As perguntas estao sendo carregadas a partir do arquivo JSON local.</p>
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
          <p>{error || 'Nenhuma pergunta foi encontrada no arquivo JSON.'}</p>
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
          <p>
            Resultado consolidado com nota final, aproveitamento e detalhes de
            acertos e erros.
          </p>
        </header>

        <ResultScreen
          questions={questions}
          answers={answers}
          onRestart={handleRestartQuiz}
        />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">DevQuiz</p>
        <h1>Quiz interativo com React e JSON local</h1>
        <p>
          Responda uma pergunta por vez, confira se acertou e acompanhe o
          progresso ate o resultado final.
        </p>
      </header>

      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        isAnswered={isCurrentQuestionAnswered}
        isCorrect={currentAnswer?.isCorrect}
        onSelectAnswer={setSelectedAnswer}
        onSubmitAnswer={handleSubmitAnswer}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    </main>
  );
}

export default Quiz;
