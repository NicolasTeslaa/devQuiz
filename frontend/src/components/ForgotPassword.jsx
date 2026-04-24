import { useState } from "react";

export function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 10) {
      return numbers
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const handlePhoneChange = (event) => {
    setPhone(formatPhone(event.target.value));
  };

  const handleNext = () => {
    if (!email && !phone) {
      setError("Informe e-mail ou telefone");
      return;
    }

    setError("");
    setStep(2);
  };

  return (
    <>
      <style>{`
        .forgot-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          color: #f8fafc;
          font-family: Inter, Arial, sans-serif;
          background:
            radial-gradient(circle at top left, rgba(59, 130, 246, 0.28), transparent 28%),
            radial-gradient(circle at top right, rgba(168, 85, 247, 0.22), transparent 26%),
            linear-gradient(135deg, #020617 0%, #0f172a 60%, #111827 100%);
        }

        .forgot-card {
          width: 100%;
          max-width: 480px;
          padding: 32px;
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.78);
          border: 1px solid rgba(148, 163, 184, 0.22);
        }

        .forgot-logo {
          font-size: 24px;
          font-weight: 900;
          margin-bottom: 20px;
        }

        .forgot-steps {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .forgot-step {
          flex: 1;
          height: 6px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.25);
        }

        .forgot-step.active {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }

        .forgot-title {
          font-size: 30px;
          margin: 0 0 8px;
        }

        .forgot-description {
          color: #94a3b8;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        input {
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          background: rgba(2, 6, 23, 0.55);
          color: white;
        }

        .error {
          color: #f87171;
          font-size: 13px;
          margin-top: 8px;
        }

        .divider {
          text-align: center;
          margin: 10px 0;
          color: #64748b;
        }

        .actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: none;
          font-weight: 800;
          cursor: pointer;
        }

        .btn-primary {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          color: white;
        }

        .btn-secondary {
          background: #1e293b;
          color: white;
        }
      `}</style>

      <main className="forgot-page">
        <section className="forgot-card">
          <div className="forgot-logo">DevQuiz</div>

          <div className="forgot-steps">
            <div className={`forgot-step ${step >= 1 ? "active" : ""}`} />
            <div className={`forgot-step ${step >= 2 ? "active" : ""}`} />
            <div className={`forgot-step ${step >= 3 ? "active" : ""}`} />
          </div>

          {step === 1 && (
            <>
              <h1 className="forgot-title">Recuperar senha</h1>
              <p className="forgot-description">
                Informe seu e-mail OU telefone.
              </p>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="divider">ou</div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>

              {error && <p className="error">{error}</p>}

              <div className="actions">
                <button className="btn btn-primary" onClick={handleNext}>
                  Enviar código
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="forgot-title">Código</h1>
              <input placeholder="000000" maxLength={6} />
              <div className="actions">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                  Voltar
                </button>
                <button className="btn btn-primary" onClick={() => setStep(3)}>
                  Validar
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="forgot-title">Nova senha</h1>

              <input type="password" placeholder="Nova senha" />
              <input type="password" placeholder="Confirmar senha" />

              <div className="actions">
                <button className="btn btn-secondary" onClick={() => setStep(2)}>
                  Voltar
                </button>
                <button className="btn btn-primary">
                  Alterar senha
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}