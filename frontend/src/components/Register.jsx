import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { saveSession } from "../utils/auth";

const levelMap = {
  iniciante: 1,
  junior: 2,
  pleno: 3,
  senior: 4,
};

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [technologies, setTechnologies] = useState([
    "HTML", "CSS", "JavaScript", "React", "SQL", "Git", "APIs REST", "C#", "Typescript", "Arquitetura",
  ]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    worksWithProgramming: "",
    experienceLevel: "",
    goal: "",
    interests: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getTechnologies()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTechnologies(data.map((item) => item.name));
        }
      })
      .catch(() => {});
  }, []);

  const nextStep = () => setStep((current) => current + 1);
  const previousStep = () => setStep((current) => current - 1);

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 10) return numbers.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
    return numbers.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
  };

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function toggleInterest(tech) {
    setForm((previous) => {
      const exists = previous.interests.includes(tech);
      return { ...previous, interests: exists ? previous.interests.filter((x) => x !== tech) : [...previous.interests, tech] };
    });
  }

  function handleStepOne() {
    if (!form.name || !form.email || !form.password) {
      setError("Preencha nome, e-mail e senha.");
      return;
    }

    setError("");
    nextStep();
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        worksWithProgramming: form.worksWithProgramming === "" ? null : form.worksWithProgramming === "sim",
        experienceLevel: form.experienceLevel ? levelMap[form.experienceLevel] ?? null : null,
        goal: form.goal || null,
        interests: form.interests,
      };

      const response = await api.register(payload);
      saveSession(response);
      navigate("/quiz");
    } catch (submitError) {
      setError(submitError.message ?? "Nao foi possivel criar a conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .register-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; color: #f8fafc; font-family: Inter, Arial, sans-serif; background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.28), transparent 28%), radial-gradient(circle at top right, rgba(168, 85, 247, 0.22), transparent 26%), linear-gradient(135deg, #020617 0%, #0f172a 60%, #111827 100%); }
        .register-card { width: 100%; max-width: 500px; padding: 32px; border-radius: 24px; background: rgba(15, 23, 42, 0.78); border: 1px solid rgba(148, 163, 184, 0.22); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35); }
        .logo { font-size: 24px; font-weight: 900; margin-bottom: 20px; }
        .steps { display: flex; gap: 8px; margin-bottom: 24px; }
        .step { flex: 1; height: 6px; border-radius: 999px; background: rgba(148, 163, 184, 0.25); }
        .step.active { background: linear-gradient(135deg, #2563eb, #7c3aed); }
        h1 { font-size: 30px; margin: 0 0 8px; }
        p { color: #94a3b8; margin: 0 0 24px; line-height: 1.5; }
        .form-group { margin-bottom: 16px; }
        label { display: block; font-size: 14px; font-weight: 700; margin-bottom: 8px; color: #cbd5e1; }
        input, select { width: 100%; box-sizing: border-box; padding: 13px 14px; border-radius: 12px; border: 1px solid rgba(148, 163, 184, 0.28); background: rgba(2, 6, 23, 0.55); color: #f8fafc; font-size: 14px; outline: none; }
        .checkbox-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .checkbox-card { display: flex; align-items: center; gap: 8px; padding: 12px; border-radius: 12px; background: rgba(2, 6, 23, 0.45); border: 1px solid rgba(148, 163, 184, 0.2); cursor: pointer; }
        .checkbox-card input { width: auto; }
        .actions { display: flex; gap: 12px; margin-top: 24px; }
        .btn { flex: 1; border: 0; cursor: pointer; padding: 13px 18px; border-radius: 12px; color: white; font-weight: 900; font-size: 15px; }
        .btn-primary { background: linear-gradient(135deg, #2563eb, #7c3aed); }
        .btn-secondary { background: rgba(30, 41, 59, 0.85); border: 1px solid rgba(148, 163, 184, 0.28); }
        .btn:disabled { opacity: 0.7; cursor: wait; }
        .error { margin-top: 12px; color: #fca5a5; }
      `}</style>

      <main className="register-page">
        <section className="register-card">
          <div className="logo">DevQuiz</div>
          <div className="steps"><div className={`step ${step >= 1 ? "active" : ""}`}></div><div className={`step ${step >= 2 ? "active" : ""}`}></div><div className={`step ${step >= 3 ? "active" : ""}`}></div></div>

          {step === 1 && (
            <>
              <h1>Criar conta</h1>
              <p>Informe seus dados principais para acessar o DevQuiz.</p>
              <div className="form-group"><label>Nome</label><input type="text" placeholder="Seu nome" value={form.name} onChange={(e) => updateField("name", e.target.value)} /></div>
              <div className="form-group"><label>E-mail *</label><input type="email" placeholder="seuemail@email.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} /></div>
              <div className="form-group"><label>Telefone</label><input type="text" placeholder="(11) 99999-9999" value={form.phone} onChange={(e) => updateField("phone", formatPhone(e.target.value))} /></div>
              <div className="form-group"><label>Senha *</label><input type="password" placeholder="Crie uma senha" value={form.password} onChange={(e) => updateField("password", e.target.value)} /></div>
              <div className="actions"><button className="btn btn-primary" onClick={handleStepOne}>Continuar</button></div>
            </>
          )}

          {step === 2 && (
            <>
              <h1>Seu perfil</h1>
              <p>Essas informacoes ajudam a personalizar sua experiencia.</p>
              <div className="form-group"><label>Voce ja trabalha com programacao?</label><select value={form.worksWithProgramming} onChange={(e) => updateField("worksWithProgramming", e.target.value)}><option value="">Selecione</option><option value="sim">Sim</option><option value="nao">Nao</option><option value="estudando">Ainda estou estudando</option></select></div>
              <div className="form-group"><label>Qual seu nivel atual?</label><select value={form.experienceLevel} onChange={(e) => updateField("experienceLevel", e.target.value)}><option value="">Selecione</option><option value="iniciante">Iniciante</option><option value="junior">Junior</option><option value="pleno">Pleno</option><option value="senior">Senior</option></select></div>
              <div className="form-group"><label>Seu objetivo</label><select value={form.goal} onChange={(e) => updateField("goal", e.target.value)}><option value="">Selecione</option><option value="primeiro-emprego">Conseguir primeiro emprego</option><option value="melhorar">Melhorar fundamentos</option><option value="entrevista">Preparar para entrevistas</option><option value="evoluir">Evoluir profissionalmente</option></select></div>
              <div className="actions"><button className="btn btn-secondary" onClick={previousStep}>Voltar</button><button className="btn btn-primary" onClick={nextStep}>Continuar</button></div>
            </>
          )}

          {step === 3 && (
            <>
              <h1>Interesses</h1>
              <p>Escolha as tecnologias que voce quer testar e evoluir.</p>
              <div className="checkbox-grid">
                {technologies.map((tech) => (
                  <label className="checkbox-card" key={tech}><input type="checkbox" checked={form.interests.includes(tech)} onChange={() => toggleInterest(tech)} />{tech}</label>
                ))}
              </div>
              <div className="actions"><button className="btn btn-secondary" onClick={previousStep}>Voltar</button><button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>{loading ? "Criando..." : "Criar conta"}</button></div>
            </>
          )}

          {error ? <p className="error">{error}</p> : null}
        </section>
      </main>
    </>
  );
}
