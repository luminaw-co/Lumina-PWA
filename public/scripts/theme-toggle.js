"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KEY = "theme";
function systemPrefersDark() {
    var _a;
    return (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-color-scheme: dark)").matches;
}
function applyTheme(theme) {
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    for (var _i = 0, _a = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile"); _i < _a.length; _i++) {
        var btn = _a[_i];
        btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
}
function currentTheme() {
    var stored = localStorage.getItem(KEY);
    if (stored === "light" || stored === "dark")
        return stored;
    return systemPrefersDark() ? "dark" : "light";
}
function toggleTheme() {
    var next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(KEY, next);
    applyTheme(next);
}
function init() {
    var _a;
    applyTheme(currentTheme());
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    (_a = mq.addEventListener) === null || _a === void 0 ? void 0 : _a.call(mq, "change", function () {
        if (!localStorage.getItem(KEY))
            applyTheme(systemPrefersDark() ? "dark" : "light");
    });
    for (var _i = 0, _b = ["theme-toggle", "theme-toggle-mobile"]; _i < _b.length; _i++) {
        var id = _b[_i];
        var btn = document.getElementById(id);
        if (btn)
            btn.addEventListener("click", toggleTheme);
    }
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
}
else {
    init();
}
