function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isAnswered,
  isCorrect,
  onSelectAnswer,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
}) {
  const feedbackClass =
    isAnswered && isCorrect ? 'feedback success' : 'feedback error';

  return (
    <section className="card question-card">
      <div className="question-header">
        <div>
          <span className="question-tag">Questao {questionNumber}</span>
          <h2>
            Pergunta {questionNumber} de {totalQuestions}
          </h2>
        </div>
        <span className="question-id">ID #{question.id}</span>
      </div>

      <p className="question-text">{question.question}</p>

      <div className="options-list" role="radiogroup" aria-label={question.question}>
        {question.options.map((option) => {
          const optionState = [
            'option-item',
            selectedAnswer === option ? 'selected' : '',
            isAnswered && option === question.correctAnswer ? 'correct' : '',
            isAnswered &&
            selectedAnswer === option &&
            option !== question.correctAnswer
              ? 'incorrect'
              : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <label key={option} className={optionState}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => onSelectAnswer(option)}
                disabled={isAnswered}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>

      {isAnswered ? (
        <div className={feedbackClass}>
          <strong>{isCorrect ? 'Resposta correta!' : 'Resposta incorreta.'}</strong>
          <span>
            {isCorrect
              ? 'Voce acertou esta questao.'
              : `Resposta correta: ${question.correctAnswer}`}
          </span>
        </div>
      ) : null}

      <div className="actions">
        {!isAnswered ? (
          <button
            type="button"
            className="primary-button"
            onClick={onSubmitAnswer}
            disabled={!selectedAnswer}
          >
            Confirmar resposta
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={onNextQuestion}>
            {isLastQuestion ? 'Finalizar quiz' : 'Proxima pergunta'}
          </button>
        )}
      </div>
    </section>
  );
}

export default QuestionCard;
