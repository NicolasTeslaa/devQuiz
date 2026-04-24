import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    return (
        <>
            <style>{`
        .login-page {
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

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 32px;
          border-radius: 24px;
          background: rgba(15, 23, 42, 0.78);
          border: 1px solid rgba(148, 163, 184, 0.22);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(16px);
        }

        .login-logo {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.8px;
          margin-bottom: 24px;
        }

        .login-badge {
          display: inline-flex;
          padding: 7px 12px;
          border-radius: 999px;
          color: #bfdbfe;
          background: rgba(37, 99, 235, 0.18);
          border: 1px solid rgba(96, 165, 250, 0.35);
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .login-title {
          font-size: 32px;
          line-height: 1.1;
          margin: 0 0 8px;
          letter-spacing: -1px;
        }

        .login-subtitle {
          color: #94a3b8;
          margin: 0 0 28px;
          line-height: 1.5;
          font-size: 15px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #cbd5e1;
        }

        .form-group input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.28);
          background: rgba(2, 6, 23, 0.55);
          color: #f8fafc;
          font-size: 14px;
          outline: none;
          transition: 0.2s ease;
        }

        .form-group input:focus {
          border-color: rgba(96, 165, 250, 0.75);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
        }

        .login-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin: 6px 0 22px;
          font-size: 14px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #cbd5e1;
          cursor: pointer;
        }

        .remember input {
          accent-color: #2563eb;
        }

        .forgot-button {
          border: 0;
          background: transparent;
          color: #93c5fd;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }

        .forgot-button:hover {
          color: #bfdbfe;
          text-decoration: underline;
        }

        .login-button-primary {
          width: 100%;
          border: 0;
          cursor: pointer;
          padding: 13px 18px;
          border-radius: 12px;
          color: white;
          font-weight: 900;
          font-size: 15px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          box-shadow: 0 12px 26px rgba(37, 99, 235, 0.32);
          transition: 0.2s ease;
        }

        .login-button-primary:hover {
          transform: translateY(-2px);
        }

        .register-area {
          margin-top: 22px;
          padding-top: 20px;
          border-top: 1px solid rgba(148, 163, 184, 0.18);
          text-align: center;
          color: #94a3b8;
          font-size: 14px;
        }

        .register-button {
          border: 0;
          background: transparent;
          color: #93c5fd;
          font-weight: 800;
          cursor: pointer;
          padding: 0;
          margin-left: 4px;
        }

        .register-button:hover {
          color: #bfdbfe;
          text-decoration: underline;
        }

        @media (max-width: 520px) {
          .login-card {
            padding: 24px;
          }

          .login-title {
            font-size: 28px;
          }

          .login-options {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

            <main className="login-page">
                <section className="login-card">
                    <div className="login-logo">DevQuiz</div>

                    <span className="login-badge">Acesse sua conta</span>

                    <h1 className="login-title">Entre para continuar</h1>

                    <p className="login-subtitle">
                        Acesse sua conta para testar conhecimentos, acompanhar sua evolução
                        e praticar tecnologias do mercado.
                    </p>

                    <form>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input id="email" type="email" placeholder="seuemail@email.com" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input id="password" type="password" placeholder="Sua senha" />
                        </div>

                        <div className="login-options">
                            <label className="remember">
                                <input type="checkbox" />
                                Lembrar senha
                            </label>

                            <button type="button" className="forgot-button"   onClick={() => navigate("/forgotPassword")}>
                                Esqueci minha senha
                            </button>
                        </div>

                        <button type="submit" className="login-button-primary">
                            Entrar
                        </button>
                    </form>

                    <div className="register-area">
                        Ainda não tem conta?
                        <button type="button" className="register-button"
                            onClick={() => navigate("/register")}>
                            Registrar
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}