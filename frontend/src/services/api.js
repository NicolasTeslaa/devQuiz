const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://localhost:7294";

function getAuthToken() {
  return localStorage.getItem("devquiz_token");
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 204) return null;

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error ?? "Falha na requisi��o.");
  }

  return payload;
}

export const api = {
  login: (body) => request("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
  register: (body) => request("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  forgotPasswordRequest: (body) => request("/api/auth/forgot-password/request", { method: "POST", body: JSON.stringify(body) }),
  forgotPasswordVerify: (body) => request("/api/auth/forgot-password/verify", { method: "POST", body: JSON.stringify(body) }),
  forgotPasswordReset: (body) => request("/api/auth/forgot-password/reset", { method: "POST", body: JSON.stringify(body) }),
  getTechnologies: () => request("/api/technologies"),
  getQuestions: () => request("/api/quiz/questions"),
  submitAttempt: (body) => request("/api/quiz/attempts", { method: "POST", body: JSON.stringify(body) }),
  getMyAttempts: () => request("/api/quiz/attempts/me"),
  getAttemptDetail: (attemptId) => request(`/api/quiz/attempts/${attemptId}`),
};
