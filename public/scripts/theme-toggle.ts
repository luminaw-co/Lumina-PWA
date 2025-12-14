type Theme = "light" | "dark";
const KEY = "theme";

function systemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  for (const btn of document.querySelectorAll<HTMLButtonElement>("#theme-toggle, #theme-toggle-mobile")) {
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
}

function currentTheme(): Theme {
  const stored = localStorage.getItem(KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return systemPrefersDark() ? "dark" : "light";
}

function toggleTheme() {
  const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem(KEY, next);
  applyTheme(next);
}

function init() {
  applyTheme(currentTheme());

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change", () => {
    if (!localStorage.getItem(KEY)) applyTheme(systemPrefersDark() ? "dark" : "light");
  });

  for (const id of ["theme-toggle", "theme-toggle-mobile"]) {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", toggleTheme);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
export {};