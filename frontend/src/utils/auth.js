const TOKEN_KEY = "devquiz_token";
const USER_KEY = "devquiz_user";

export function saveSession(authResponse) {
  localStorage.setItem(TOKEN_KEY, authResponse.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify({
    userId: authResponse.userId,
    name: authResponse.name,
    email: authResponse.email,
    expiresAtUtc: authResponse.expiresAtUtc,
  }));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
