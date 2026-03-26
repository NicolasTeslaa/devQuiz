function ResultScreen({ questions, answers, onRestart }) {
  const totalQuestions = questions.length;
  const correctAnswers = answers.filter((answer) => answer.isCorrect);
  const wrongAnswers = answers.filter((answer) => !answer.isCorrect);
  const score = correctAnswers.length;
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const finalGrade = totalQuestions > 0 ? (score / totalQuestions) * 10 : 0;

  return (
    <section className="results-layout">
      <div className="card result-hero">
        <span className="result-badge">Resultado final</span>
        <h2>Seu desempenho no quiz</h2>
        <p>
          Voce concluiu o quiz. Confira sua nota, o percentual de aproveitamento e
          o detalhamento completo das respostas.
        </p>

        <div className="score-grid">
          <article className="score-item">
            <span>Nota final</span>
            <strong>{finalGrade.toFixed(1)}</strong>
          </article>
          <article className="score-item">
            <span>Total de perguntas</span>
            <strong>{totalQuestions}</strong>
          </article>
          <article className="score-item">
            <span>Acertos</span>
            <strong>{correctAnswers.length}</strong>
          </article>
          <article className="score-item">
            <span>Erros</span>
            <strong>{wrongAnswers.length}</strong>
          </article>
          <article className="score-item">
            <span>Aproveitamento</span>
            <strong>{percentage.toFixed(0)}%</strong>
          </article>
        </div>

        <button type="button" className="secondary-button" onClick={onRestart}>
          Reiniciar quiz
        </button>
      </div>

      <div className="results-columns">
        <section className="card result-list success-list">
          <h3>Perguntas acertadas</h3>
          {correctAnswers.length === 0 ? (
            <p>Nenhuma pergunta foi acertada nesta tentativa.</p>
          ) : (
            <div className="result-items">
              {correctAnswers.map((answer) => (
                <article key={answer.questionId} className="result-entry">
                  <span className="entry-status success">Acerto</span>
                  <h4>{answer.question}</h4>
                  <p>Sua resposta: {answer.selectedAnswer}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="card result-list error-list">
          <h3>Perguntas erradas</h3>
          {wrongAnswers.length === 0 ? (
            <p>Parabens! Voce acertou todas as perguntas.</p>
          ) : (
            <div className="result-items">
              {wrongAnswers.map((answer) => (
                <article key={answer.questionId} className="result-entry">
                  <span className="entry-status error">Erro</span>
                  <h4>{answer.question}</h4>
                  <p>Resposta marcada: {answer.selectedAnswer}</p>
                  <p>Resposta correta: {answer.correctAnswer}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default ResultScreen;
