// Light/dark theme. On a first visit the site is dark. Clicking the button
// in the header switches theme, and that choice is remembered
// (localStorage) across visits.
// The theme is first applied by the small script in each page's <head>,
// so the page never flashes the wrong colors.
(function () {
  var root = document.documentElement;

  function apply(theme) {
    root.dataset.theme = theme;
    // Match the phone browser's toolbar to the page background
    var bar = document.querySelector('meta[name="theme-color"]');
    if (bar) bar.content = theme === "light" ? "#f3f6f9" : "#161c23";
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
})();
