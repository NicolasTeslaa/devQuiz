import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { clearSession, getCurrentUser, isAuthenticated } from "../utils/auth";

const fallbackTechnologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "SQL",
  "Git",
  "APIs REST",
  "C#",
  "Typescript",
  "Arquitetura",
];

export function Dashboard() {
  const [technologies, setTechnologies] = useState(fallbackTechnologies);
  const [isLoadingTech, setIsLoadingTech] = useState(true);
  const [techError, setTechError] = useState("");
  const [user, setUser] = useState(getCurrentUser());
  const [attempts, setAttempts] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [isLoadingAttempts, setIsLoadingAttempts] = useState(false);
  const [attemptsError, setAttemptsError] = useState("");
  const navigate = useNavigate();
  const loggedIn = Boolean(user) && isAuthenticated();

  useEffect(() => {
    async function loadTechnologies() {
      try {
        const response = await api.getTechnologies();
        if (Array.isArray(response) && response.length > 0) {
          setTechnologies(response.map((item) => item.name));
        }
      } catch {
        setTechError("Nao foi possivel carregar tecnologias da API.");
      } finally {
        setIsLoadingTech(false);
      }
    }

    loadTechnologies();
  }, []);

  useEffect(() => {
    if (!user || !isAuthenticated()) {
      setAttempts([]);
      setSelectedAttempt(null);
      return;
    }

    async function loadAttempts() {
      try {
        setIsLoadingAttempts(true);
        setAttemptsError("");
        const response = await api.getMyAttempts();
        setAttempts(Array.isArray(response) ? response : []);
      } catch (error) {
        setAttemptsError(error.message ?? "Nao foi possivel carregar seus resultados.");
      } finally {
        setIsLoadingAttempts(false);
      }
    }

    loadAttempts();
  }, [user]);

  function handleAuthClick() {
    if (isAuthenticated()) {
      clearSession();
      setUser(null);
      setAttempts([]);
      setSelectedAttempt(null);
      return;
    }

    navigate("/login");
  }

  function handleStartQuiz() {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    navigate("/quiz");
  }

  async function handleSelectAttempt(attemptId) {
    try {
      setAttemptsError("");
      const detail = await api.getAttemptDetail(attemptId);
      setSelectedAttempt(detail);
    } catch (error) {
      setAttemptsError(error.message ?? "Nao foi possivel carregar o detalhe do quiz.");
    }
  }

  function formatAttemptDate(value) {
    if (!value) return "Data indisponivel";

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  const totalFinished = attempts.length;
  const latestAttempt = attempts[0];
  const bestAttempt = attempts.reduce((best, attempt) => (
    !best || attempt.percentage > best.percentage ? attempt : best
  ), null);

  return (
    <>
      <style>{`
        .dashboard {
          min-height: 100vh;
          padding: 24px;
          color: #f8fafc;
          font-family: Inter, Arial, sans-serif;
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.28), transparent 28%),
            radial-gradient(circle at top right, rgba(168, 85, 247, 0.22), transparent 26%),
            linear-gradient(135deg, #020617 0%, #0f172a 60%, #111827 100%);
        }
        .dashboard-container { max-width: 1040px; margin: 0 auto; }
        .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
        .logo { font-size: 22px; font-weight: 900; letter-spacing: -0.8px; }
        .login-button { padding: 10px 18px; border-radius: 999px; border: 1px solid rgba(148, 163, 184, 0.35); background: rgba(15, 23, 42, 0.7); color: #f8fafc; font-weight: 800; cursor: pointer; transition: 0.2s ease; }
        .login-button:hover { background: rgba(37, 99, 235, 0.25); border-color: rgba(96, 165, 250, 0.65); transform: translateY(-2px); }
        .hero { margin-bottom: 28px; }
        .hero-content { padding: 30px; border: 1px solid rgba(148, 163, 184, 0.22); border-radius: 18px; background: rgba(15, 23, 42, 0.72); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.32); backdrop-filter: blur(16px); }
        .hero-content.compact { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 22px; align-items: center; }
        .badge { display: inline-flex; padding: 7px 12px; border-radius: 999px; color: #bfdbfe; background: rgba(37, 99, 235, 0.18); border: 1px solid rgba(96, 165, 250, 0.35); font-size: 12px; font-weight: 800; margin-bottom: 14px; }
        .hero h1 { max-width: 760px; font-size: clamp(30px, 4.5vw, 52px); line-height: 1.02; margin: 0 0 16px; letter-spacing: -1.6px; }
        .hero-content.compact h1 { font-size: clamp(28px, 3.2vw, 40px); margin-bottom: 10px; }
        .highlight { background: linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { color: #cbd5e1; font-size: 16px; line-height: 1.65; max-width: 660px; margin: 0 0 22px; }
        .hero-content.compact p { margin-bottom: 0; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn { border: 0; cursor: pointer; padding: 11px 16px; border-radius: 12px; color: white; font-weight: 800; font-size: 14px; transition: 0.2s ease; }
        .btn-primary { background: linear-gradient(135deg, #2563eb, #7c3aed); box-shadow: 0 12px 26px rgba(37, 99, 235, 0.32); }
        .btn-secondary { background: rgba(30, 41, 59, 0.85); border: 1px solid rgba(148, 163, 184, 0.28); }
        .btn:hover { transform: translateY(-2px); }
        .section-header { margin: 30px 0 14px; }
        .section-header h2 { font-size: 24px; margin: 0; letter-spacing: -0.6px; }
        .section-header p { color: #94a3b8; margin: 4px 0 0; }
        .command-panel { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr); gap: 14px; align-items: stretch; }
        .primary-action { display: grid; align-content: space-between; min-height: 220px; padding: 22px; border-radius: 18px; background: linear-gradient(135deg, rgba(37, 99, 235, 0.24), rgba(15, 23, 42, 0.82)); border: 1px solid rgba(96, 165, 250, 0.32); }
        .primary-action h3, .quick-actions h3 { margin: 0 0 8px; font-size: 22px; letter-spacing: -0.4px; }
        .primary-action p, .quick-actions p, .metric-card span { color: #94a3b8; margin: 0; line-height: 1.55; }
        .quick-actions { display: grid; gap: 12px; }
        .quick-link { display: flex; align-items: center; justify-content: space-between; gap: 14px; width: 100%; text-align: left; padding: 16px; border-radius: 16px; color: #f8fafc; background: rgba(15, 23, 42, 0.76); border: 1px solid rgba(148, 163, 184, 0.2); cursor: pointer; transition: 0.2s ease; }
        .quick-link:hover { transform: translateY(-2px); border-color: rgba(96, 165, 250, 0.55); background: rgba(30, 41, 59, 0.9); }
        .quick-link strong, .quick-link span { display: block; }
        .quick-link span { color: #94a3b8; font-size: 13px; margin-top: 3px; }
        .quick-link .arrow { color: #93c5fd; font-weight: 900; }
        .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 14px; }
        .metric-card { padding: 16px; border-radius: 16px; background: rgba(15, 23, 42, 0.72); border: 1px solid rgba(148, 163, 184, 0.18); }
        .metric-card strong { display: block; margin-top: 8px; font-size: 24px; }
        .tech-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .tech-card { padding: 16px; border-radius: 18px; background: rgba(15, 23, 42, 0.72); border: 1px solid rgba(148, 163, 184, 0.18); }
        .tech-card h3 { margin: 0 0 6px; font-size: 16px; }
        .tech-card p { color: #94a3b8; font-size: 13px; }
        .status { color: #bfdbfe; font-size: 14px; margin-top: 12px; }
        .results-panel { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 14px; align-items: start; }
        .attempt-list, .attempt-detail { min-height: 260px; padding: 18px; border-radius: 18px; background: rgba(15, 23, 42, 0.72); border: 1px solid rgba(148, 163, 184, 0.18); }
        .attempt-list { display: grid; gap: 10px; }
        .attempt-card { width: 100%; text-align: left; padding: 14px; border-radius: 14px; border: 1px solid rgba(148, 163, 184, 0.2); background: rgba(2, 6, 23, 0.42); color: #f8fafc; cursor: pointer; transition: 0.2s ease; }
        .attempt-card:hover, .attempt-card.active { border-color: rgba(96, 165, 250, 0.62); background: rgba(37, 99, 235, 0.16); transform: translateY(-1px); }
        .attempt-card strong, .attempt-card span { display: block; }
        .attempt-card span { margin-top: 4px; color: #94a3b8; font-size: 13px; }
        .empty-state { color: #94a3b8; margin: 0; line-height: 1.55; }
        .detail-header { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; margin-bottom: 14px; }
        .detail-header h3 { margin: 0 0 6px; font-size: 18px; }
        .score-pill { flex-shrink: 0; padding: 8px 10px; border-radius: 999px; background: rgba(34, 197, 94, 0.14); border: 1px solid rgba(74, 222, 128, 0.3); color: #bbf7d0; font-weight: 900; }
        .answer-groups { display: grid; gap: 16px; }
        .answer-group h4 { margin: 0 0 10px; color: #cbd5e1; }
        .answer-items { display: grid; gap: 10px; max-height: 360px; overflow: auto; padding-right: 4px; }
        .answer-item { padding: 12px; border-radius: 14px; background: rgba(2, 6, 23, 0.38); border: 1px solid rgba(148, 163, 184, 0.16); }
        .answer-item.correct { border-color: rgba(74, 222, 128, 0.38); }
        .answer-item.incorrect { border-color: rgba(248, 113, 113, 0.42); }
        .answer-item strong { display: block; margin-bottom: 8px; }
        .answer-item p { margin: 4px 0; color: #94a3b8; font-size: 13px; }
        .answer-item .answer-ok { color: #86efac; }
        .answer-item .answer-bad { color: #fca5a5; }
        @media (max-width: 860px) { .hero-content.compact, .command-panel, .results-panel { grid-template-columns: 1fr; } .metrics-grid { grid-template-columns: repeat(2, 1fr); } .tech-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .dashboard { padding: 16px; } .topbar, .detail-header { flex-direction: column; } .hero-content { padding: 22px; } .metrics-grid, .tech-grid { grid-template-columns: 1fr; } }
      `}</style>

      <main className="dashboard">
        <div className="dashboard-container">
          <header className="topbar">
            <div className="logo">DevQuiz</div>
            <button className="login-button" onClick={handleAuthClick}>{isAuthenticated() ? "Sair" : "Entrar"}</button>
          </header>

          <section className="hero">
            {loggedIn ? (
              <div className="hero-content compact">
                <div>
                  <span className="badge">Painel do aluno</span>
                  <h1>Bem-vindo, <span className="highlight">{user.name}</span></h1>
                  <p>Continue sua pratica, acompanhe resultados e ajuste os assuntos do proximo quiz.</p>
                  {techError ? <p className="status">{techError}</p> : null}
                </div>
                <div className="hero-actions">
                  <button className="btn btn-primary" onClick={handleStartQuiz}>Comecar quiz</button>
                  <button className="btn btn-secondary" onClick={() => document.getElementById("results-list")?.scrollIntoView({ behavior: "smooth" })}>Ver resultados</button>
                </div>
              </div>
            ) : (
              <div className="hero-content">
                <span className="badge">Teste e evolucao profissional</span>
                <h1>Teste seus conhecimentos em programacao <span className="highlight">e evolua como dev</span></h1>
                <p>O DevQuiz ajuda voce a validar o que realmente sabe, identificar falhas e evoluir de forma pratica com quizzes baseados em tecnologias do mercado.</p>
                {techError ? <p className="status">{techError}</p> : null}
                <div className="hero-actions">
                  <button className="btn btn-primary" onClick={handleStartQuiz}>Comecar quiz</button>
                  <button className="btn btn-secondary" onClick={() => document.getElementById("tech-list")?.scrollIntoView({ behavior: "smooth" })}>Ver tecnologias</button>
                </div>
              </div>
            )}
          </section>

          <section>
            <div className="section-header"><h2>{loggedIn ? "Seu painel" : "Como funciona"}</h2><p>{loggedIn ? "Acesse rapidamente as principais areas." : "Comece pelo quiz, revise o resultado e pratique por assunto."}</p></div>
            <div className="command-panel">
              <div className="primary-action">
                <div>
                  <span className="badge">{loggedIn ? "Proxima tentativa" : "Fluxo principal"}</span>
                  <h3>{loggedIn ? "Iniciar um novo quiz" : "Teste seus conhecimentos"}</h3>
                  <p>{loggedIn ? "Use os filtros de assuntos dentro do quiz para focar em tecnologias especificas." : "Responda perguntas objetivas, receba sua pontuacao e veja exatamente onde precisa revisar."}</p>
                </div>
                <div className="hero-actions">
                  <button className="btn btn-primary" onClick={handleStartQuiz}>{loggedIn ? "Comecar agora" : "Entrar para iniciar"}</button>
                  <button className="btn btn-secondary" onClick={() => document.getElementById("tech-list")?.scrollIntoView({ behavior: "smooth" })}>Ver assuntos</button>
                </div>
              </div>

              <div className="quick-actions">
                <button type="button" className="quick-link" onClick={() => document.getElementById("results-list")?.scrollIntoView({ behavior: "smooth" })}>
                  <span><strong>{loggedIn ? "Resultados" : "Historico de desempenho"}</strong><span>{loggedIn ? "Revise acertos, erros e notas." : "Depois de logar, suas tentativas ficam salvas aqui."}</span></span>
                  <span className="arrow">-&gt;</span>
                </button>
                <button type="button" className="quick-link" onClick={() => document.getElementById("tech-list")?.scrollIntoView({ behavior: "smooth" })}>
                  <span><strong>Assuntos disponiveis</strong><span>{technologies.length} tecnologias para praticar.</span></span>
                  <span className="arrow">-&gt;</span>
                </button>
              </div>
            </div>

            {loggedIn ? (
              <div className="metrics-grid">
                <div className="metric-card"><span>Tentativas finalizadas</span><strong>{isLoadingAttempts ? "..." : totalFinished}</strong></div>
                <div className="metric-card"><span>Ultimo resultado</span><strong>{latestAttempt ? `${latestAttempt.score}/${latestAttempt.totalQuestions}` : "-"}</strong></div>
                <div className="metric-card"><span>Melhor aproveitamento</span><strong>{bestAttempt ? `${Number(bestAttempt.percentage).toFixed(0)}%` : "-"}</strong></div>
              </div>
            ) : null}
          </section>

          <section id="results-list">
            <div className="section-header"><h2>Resultados dos quizzes</h2><p>Acompanhe suas tentativas finalizadas e revise acertos e erros.</p></div>
            {!user ? (
              <div className="attempt-detail">
                <p className="empty-state">Entre na sua conta para ver o historico dos quizzes finalizados.</p>
              </div>
            ) : (
              <div className="results-panel">
                <div className="attempt-list">
                  {isLoadingAttempts ? <p className="empty-state">Carregando resultados...</p> : null}
                  {attemptsError ? <p className="status">{attemptsError}</p> : null}
                  {!isLoadingAttempts && attempts.length === 0 ? <p className="empty-state">Nenhuma tentativa finalizada ainda.</p> : null}
                  {attempts.map((attempt) => (
                    <button
                      type="button"
                      key={attempt.attemptId}
                      className={`attempt-card ${selectedAttempt?.attemptId === attempt.attemptId ? "active" : ""}`}
                      onClick={() => handleSelectAttempt(attempt.attemptId)}
                    >
                      <strong>Quiz de {formatAttemptDate(attempt.finishedAtUtc)}</strong>
                      <span>{attempt.score}/{attempt.totalQuestions} questoes acertadas · {Number(attempt.percentage).toFixed(0)}%</span>
                    </button>
                  ))}
                </div>

                <div className="attempt-detail">
                  {!selectedAttempt ? (
                    <p className="empty-state">Clique em um quiz para ver tudo que voce acertou e errou.</p>
                  ) : (
                    <>
                      <div className="detail-header">
                        <div>
                          <h3>Quiz de {formatAttemptDate(selectedAttempt.finishedAtUtc)}</h3>
                          <p className="empty-state">{selectedAttempt.score}/{selectedAttempt.totalQuestions} questoes acertadas</p>
                        </div>
                        <span className="score-pill">Nota {Number(selectedAttempt.finalGrade).toFixed(1)}</span>
                      </div>

                      <div className="answer-groups">
                        <div className="answer-group">
                          <h4>Erros</h4>
                          <div className="answer-items">
                            {selectedAttempt.answers.filter((answer) => !answer.isCorrect).length === 0 ? <p className="empty-state">Nenhum erro nessa tentativa.</p> : null}
                            {selectedAttempt.answers.filter((answer) => !answer.isCorrect).map((answer) => (
                              <article key={answer.questionId} className="answer-item incorrect">
                                <strong>{answer.technologyName} · Questao {answer.externalId}</strong>
                                <p>{answer.question}</p>
                                <p className="answer-bad">Sua resposta: {answer.selectedAnswer}</p>
                                <p className="answer-ok">Correta: {answer.correctAnswer}</p>
                              </article>
                            ))}
                          </div>
                        </div>

                        <div className="answer-group">
                          <h4>Acertos</h4>
                          <div className="answer-items">
                            {selectedAttempt.answers.filter((answer) => answer.isCorrect).map((answer) => (
                              <article key={answer.questionId} className="answer-item correct">
                                <strong>{answer.technologyName} · Questao {answer.externalId}</strong>
                                <p>{answer.question}</p>
                                <p className="answer-ok">Resposta: {answer.correctAnswer}</p>
                              </article>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </section>

          <section id="tech-list">
            <div className="section-header"><h2>Tecnologias para praticar</h2><p>{isLoadingTech ? "Carregando..." : "Escolha uma area e evolua com foco."}</p></div>
            <div className="tech-grid">
              {technologies.map((tech) => (
                <div key={tech} className="tech-card"><h3>{tech}</h3><p>Teste e reforce seus conhecimentos.</p></div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
