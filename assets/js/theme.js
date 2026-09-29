// Light/dark toggle. The site is dark by default; clicking the button in
// the header switches to light and back, and the choice is remembered
// (localStorage) across visits.
(function () {
  var button = document.querySelector(".theme-toggle");
  if (!button) return;

  button.addEventListener("click", function () {
    var isDark = document.documentElement.dataset.theme !== "light";
    var next = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);

    // Match the phone browser's toolbar to the page background
    var bar = document.querySelector('meta[name="theme-color"]');
    if (bar) bar.content = next === "light" ? "#f3f6f9" : "#131f2c";
  });
})();
