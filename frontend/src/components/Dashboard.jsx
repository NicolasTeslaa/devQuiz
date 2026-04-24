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
  const navigate = useNavigate();

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

  function handleAuthClick() {
    if (isAuthenticated()) {
      clearSession();
      setUser(null);
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
        .hero { margin-bottom: 32px; }
        .hero-content { padding: 28px; border: 1px solid rgba(148, 163, 184, 0.22); border-radius: 24px; background: rgba(15, 23, 42, 0.72); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.32); backdrop-filter: blur(16px); }
        .badge { display: inline-flex; padding: 7px 12px; border-radius: 999px; color: #bfdbfe; background: rgba(37, 99, 235, 0.18); border: 1px solid rgba(96, 165, 250, 0.35); font-size: 12px; font-weight: 800; margin-bottom: 14px; }
        .hero h1 { max-width: 760px; font-size: clamp(30px, 4.5vw, 52px); line-height: 1.02; margin: 0 0 16px; letter-spacing: -1.6px; }
        .highlight { background: linear-gradient(90deg, #60a5fa, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { color: #cbd5e1; font-size: 16px; line-height: 1.65; max-width: 660px; margin: 0 0 22px; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn { border: 0; cursor: pointer; padding: 11px 16px; border-radius: 12px; color: white; font-weight: 800; font-size: 14px; transition: 0.2s ease; }
        .btn-primary { background: linear-gradient(135deg, #2563eb, #7c3aed); box-shadow: 0 12px 26px rgba(37, 99, 235, 0.32); }
        .btn-secondary { background: rgba(30, 41, 59, 0.85); border: 1px solid rgba(148, 163, 184, 0.28); }
        .btn:hover { transform: translateY(-2px); }
        .section-header { margin: 30px 0 14px; }
        .section-header h2 { font-size: 24px; margin: 0; letter-spacing: -0.6px; }
        .section-header p { color: #94a3b8; margin: 4px 0 0; }
        .actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .action-card { padding: 20px; min-height: 190px; border-radius: 20px; background: rgba(15, 23, 42, 0.76); border: 1px solid rgba(148, 163, 184, 0.2); transition: 0.22s ease; }
        .action-card:hover { transform: translateY(-4px); border-color: rgba(96, 165, 250, 0.55); }
        .icon { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 14px; background: linear-gradient(135deg, #2563eb, #7c3aed); font-size: 20px; margin-bottom: 14px; }
        .action-card h3 { margin: 0 0 8px; font-size: 18px; }
        .action-card p { color: #94a3b8; margin-bottom: 16px; }
        .tech-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .tech-card { padding: 16px; border-radius: 18px; background: rgba(15, 23, 42, 0.72); border: 1px solid rgba(148, 163, 184, 0.18); }
        .tech-card h3 { margin: 0 0 6px; font-size: 16px; }
        .tech-card p { color: #94a3b8; font-size: 13px; }
        .status { color: #bfdbfe; font-size: 14px; margin-top: 12px; }
      `}</style>

      <main className="dashboard">
        <div className="dashboard-container">
          <header className="topbar">
            <div className="logo">DevQuiz</div>
            <button className="login-button" onClick={handleAuthClick}>{isAuthenticated() ? "Sair" : "Entrar"}</button>
          </header>

          <section className="hero">
            <div className="hero-content">
              <span className="badge">Teste e evolucao profissional</span>
              <h1>Teste seus conhecimentos em programacao <span className="highlight">e evolua como dev</span></h1>
              <p>O DevQuiz ajuda voce a validar o que realmente sabe, identificar falhas e evoluir de forma pratica com quizzes baseados em tecnologias do mercado.</p>
              {user ? <p className="status">Conectado como {user.name}.</p> : null}
              {techError ? <p className="status">{techError}</p> : null}
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={handleStartQuiz}>Comecar quiz</button>
                <button className="btn btn-secondary" onClick={() => document.getElementById("tech-list")?.scrollIntoView({ behavior: "smooth" })}>Ver tecnologias</button>
              </div>
            </div>
          </section>

          <section>
            <div className="section-header"><h2>O que voce quer fazer?</h2><p>Escolha como deseja evoluir hoje.</p></div>
            <div className="actions-grid">
              <div className="action-card"><div className="icon">Quiz</div><h3>Testar conhecimentos</h3><p>Descubra seu nivel atual com perguntas objetivas.</p><button className="btn btn-primary" onClick={handleStartQuiz}>Iniciar</button></div>
              <div className="action-card"><div className="icon">Stack</div><h3>Praticar tecnologias</h3><p>Fortaleca seus fundamentos por stack.</p></div>
              <div className="action-card"><div className="icon">Meta</div><h3>Evoluir como dev</h3><p>Use seus resultados para guiar seus estudos.</p></div>
            </div>
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
