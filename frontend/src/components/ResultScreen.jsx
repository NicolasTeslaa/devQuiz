import { useNavigate } from "react-router-dom";

function ResultScreen({ questions, answers, summary, onRestart }) {
  const navigate = useNavigate();

  const totalQuestions = summary?.totalQuestions ?? questions.length;
  const score = summary?.score ?? answers.length;
  const percentage = summary?.percentage ?? (totalQuestions > 0 ? (score / totalQuestions) * 100 : 0);
  const finalGrade = summary?.finalGrade ?? (totalQuestions > 0 ? (score / totalQuestions) * 10 : 0);

  return (
    <section className="results-layout">
      <div className="card result-hero">
        <span className="result-badge">Resultado final</span>
        <h2>Seu desempenho no quiz</h2>
        <p>Resultado consolidado com nota final e aproveitamento da tentativa.</p>

        <div className="score-grid">
          <article className="score-item"><span>Nota final</span><strong>{Number(finalGrade).toFixed(1)}</strong></article>
          <article className="score-item"><span>Total de perguntas</span><strong>{totalQuestions}</strong></article>
          <article className="score-item"><span>Pontuacao</span><strong>{score}</strong></article>
          <article className="score-item"><span>Aproveitamento</span><strong>{Number(percentage).toFixed(0)}%</strong></article>
        </div>

        <div className="actions" style={{ justifyContent: "flex-start", gap: "12px" }}>
          <button type="button" className="secondary-button" onClick={onRestart}>Reiniciar quiz</button>
          <button type="button" className="primary-button" onClick={() => navigate("/")}>Voltar ao dashboard</button>
        </div>
      </div>
    </section>
  );
}

export default ResultScreen;
