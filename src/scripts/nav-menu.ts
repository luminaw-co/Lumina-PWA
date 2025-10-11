function ready(fn: () => void) {
  (document.readyState === "loading")
    ? document.addEventListener("DOMContentLoaded", fn, { once: true })
    : fn();
}

ready(() => {
  const btn   = document.getElementById("menu-btn") as HTMLButtonElement | null;
  const panel = document.getElementById("mobile-menu") as HTMLElement | null;
  if (!btn || !panel) return;

  const toggle = () => {
    const isHidden = panel.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", isHidden ? "false" : "true");
  };

  btn.removeEventListener("click", toggle as any);
  btn.addEventListener("click", toggle);
});
export {};