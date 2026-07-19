// Light/dark toggle. The site follows the visitor's system setting by
// default; clicking the button in the header overrides it, and the choice
// is remembered (localStorage) across visits.
(function () {
  var button = document.querySelector(".theme-toggle");
  if (!button) return;

  button.addEventListener("click", function () {
    var explicit = document.documentElement.dataset.theme;
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = explicit ? explicit === "dark" : systemDark;
    var next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
})();
