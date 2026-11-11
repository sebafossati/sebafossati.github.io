// Light/dark theme. On a first visit the site follows the visitor's device
// setting (light or dark). Clicking the button in the header switches
// theme, and that choice is remembered (localStorage) across visits.
// The theme is first applied by the small script in each page's <head>,
// so the page never flashes the wrong colors.
(function () {
  var root = document.documentElement;

  function apply(theme) {
    root.dataset.theme = theme;
    // Match the phone browser's toolbar to the page background
    var bar = document.querySelector('meta[name="theme-color"]');
    if (bar) bar.content = theme === "light" ? "#f3f6f9" : "#0a111a";
  }

  function saved() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  var button = document.querySelector(".theme-toggle");
  if (button) {
    button.addEventListener("click", function () {
      var next = root.dataset.theme === "light" ? "dark" : "light";
      apply(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  // Until the visitor picks a theme with the button, keep following the
  // device setting if it changes (e.g. automatic dark mode at night)
  var prefersLight = window.matchMedia("(prefers-color-scheme: light)");
  if (prefersLight.addEventListener) {
    prefersLight.addEventListener("change", function (e) {
      if (!saved()) apply(e.matches ? "light" : "dark");
    });
  }
})();
