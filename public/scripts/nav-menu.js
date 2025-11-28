"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ready(fn) {
    (document.readyState === "loading")
        ? document.addEventListener("DOMContentLoaded", fn, { once: true })
        : fn();
}
ready(function () {
    var btn = document.getElementById("menu-btn");
    var panel = document.getElementById("mobile-menu");
    if (!btn || !panel)
        return;
    var toggle = function () {
        var isHidden = panel.classList.toggle("hidden");
        btn.setAttribute("aria-expanded", isHidden ? "false" : "true");
    };
    btn.removeEventListener("click", toggle);
    btn.addEventListener("click", toggle);
});
