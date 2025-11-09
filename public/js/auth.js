// public/js/auth.js
const AFTER_LOGIN_PATH = "/index.html"; // <-- your e-commerce dashboard

const AuthAPI = {
  register: (body) =>
    fetch(`/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "applicatiosn/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  login: (body) =>
    fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
};

const authState = {
  get token() { return localStorage.getItem("token") || ""; },
  set token(v) { localStorage.setItem("token", v); },
  get user()  { try { return JSON.parse(localStorage.getItem("user")||"{}"); } catch { return {}; } },
  set user(v) { localStorage.setItem("user", JSON.stringify(v)); },
  logout() { localStorage.removeItem("token"); localStorage.removeItem("user"); }
};

export function bindAuthForms() {
  const regForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const swapToLogin = document.getElementById("swapToLogin");
  const swapToRegister = document.getElementById("swapToRegister");

  if (swapToLogin)   swapToLogin.onclick   = () => toggleView("login");
  if (swapToRegister)swapToRegister.onclick= () => toggleView("register");

  function toggleView(which) {
    document.getElementById("loginCard").style.display    = which==="login" ? "block" : "none";
    document.getElementById("registerCard").style.display = which==="register" ? "block" : "none";
  }

  if (regForm) regForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(regForm).entries());
    const res  = await AuthAPI.register(body);
    alert(res.ok ? "Account created! Please login." : (res.error || "Registration failed"));
    if (res.ok) toggleView("login");
  });

  if (loginForm) loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(loginForm).entries());
    const res  = await AuthAPI.login(body);
    if (res.ok) {
      authState.token = res.token;
      authState.user  = res.user;
      location.href   = AFTER_LOGIN_PATH;
    } else {
      alert(res.error || "Login failed");
    }
  });
}

// Guard to use on pages that require login
export function requireLoginOrRedirect() {
  if (!authState.token) location.href = "/login.html";
}

// Hook for logout buttons/links
export function bindLogout(selector) {
  const el = document.querySelector(selector);
  if (el) el.addEventListener("click", (e) => {
    e.preventDefault();
    authState.logout();
    location.href = "/login.html";
  });
}
