// Filters on the Research page. The two rows of buttons (.filter) show or
// hide papers by matching each button's data-value against the paper's
// data-status / data-subject. Also fills in the paper counts on the
// buttons, writes the subject under each paper's year, and keeps the
// choice in the address (e.g. research.html#crime+publications) so a
// filtered view can be linked to.
(function () {
  // Short subject names shown under the year
  var subjectNames = {
    "time-series": "Time series",
    "crime": "Crime",
    "labour": "Labour",
    "other": "Other"
  };

  var bar = document.querySelector(".filters");
  if (!bar) return;

  var buttons = Array.prototype.slice.call(bar.querySelectorAll(".filter"));
  var pubs = Array.prototype.slice.call(document.querySelectorAll(".pub[data-status]"));
  var lists = Array.prototype.slice.call(document.querySelectorAll(".section .pubs"));
  var empty = document.querySelector(".filter-empty");
  var state = { status: "all", subject: "all" };

  pubs.forEach(function (pub) {
    var year = pub.querySelector(".pub-year");
    var name = subjectNames[pub.dataset.subject];
    if (!year || !name) return;
    var tag = document.createElement("span");
    tag.className = "pub-subject";
    tag.textContent = name;
    year.appendChild(tag);
  });

  buttons.forEach(function (button) {
    var count = document.createElement("span");
    count.className = "filter-count";
    button.appendChild(count);
  });

  function matches(pub, status, subject) {
    return (status === "all" || pub.dataset.status === status) &&
           (subject === "all" || pub.dataset.subject === subject);
  }

  function apply() {
    var shown = 0;

    pubs.forEach(function (pub) {
      pub.hidden = !matches(pub, state.status, state.subject);
      pub.classList.remove("pub-first");
      if (!pub.hidden) shown++;
    });

    // A list with nothing left hides its whole section
    lists.forEach(function (list) {
      var first = list.querySelector(".pub:not([hidden])");
      if (first) first.classList.add("pub-first");
      list.closest(".section").hidden = !first;
    });

    // Each count is what the button would show, given the other row
    buttons.forEach(function (button) {
      var row = button.dataset.filter;
      var value = button.dataset.value;
      var status = row === "status" ? value : state.status;
      var subject = row === "subject" ? value : state.subject;
      var n = pubs.filter(function (pub) { return matches(pub, status, subject); }).length;
      var pressed = state[row] === value;
      button.querySelector(".filter-count").textContent = n;
      button.setAttribute("aria-pressed", pressed ? "true" : "false");
      button.disabled = n === 0 && !pressed;
    });

    if (empty) empty.hidden = shown > 0;
  }

  function readAddress() {
    state.status = "all";
    state.subject = "all";
    location.hash.slice(1).split("+").forEach(function (word) {
      buttons.forEach(function (button) {
        if (button.dataset.value === word && word !== "all") state[button.dataset.filter] = word;
      });
    });
  }

  function writeAddress() {
    var words = [state.subject, state.status].filter(function (word) { return word !== "all"; });
    var address = words.length ? "#" + words.join("+") : location.pathname + location.search;
    try { history.replaceState(null, "", address); } catch (e) {}
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      state[button.dataset.filter] = button.dataset.value;
      apply();
      writeAddress();
    });
  });

  window.addEventListener("hashchange", function () {
    readAddress();
    apply();
  });

  readAddress();
  apply();
  bar.hidden = false;
})();
