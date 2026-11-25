// Filters on the Research page. The two rows of buttons (.filter) show or
// hide papers by matching each button's data-value against the paper's
// data-status / data-subject. Also fills in the paper counts on the
// buttons, builds a row of tags above each paper's title (a teal tag per
// subject, then the status pill moved up from the details line), and keeps the choice in the address (e.g. research.html#crime+publications) so a
// filtered view can be linked to.
(function () {
  // Short subject names shown on each paper's subject tags. A paper can
  // have several subjects: data-subject="time-series crime".
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

  function subjectsOf(pub) {
    return (pub.dataset.subject || "").split(/\s+/).filter(Boolean);
  }

  pubs.forEach(function (pub) {
    var body = pub.querySelector(".pub-body");
    if (!body) return;

    // Tag row above the title: subjects first, then the status pill
    var row = document.createElement("div");
    row.className = "pub-tags";
    subjectsOf(pub).forEach(function (s) {
      if (!subjectNames[s]) return;
      var tag = document.createElement("span");
      tag.className = "status status-subject";
      tag.textContent = subjectNames[s];
      row.appendChild(tag);
    });

    // Take each status pill out of the details line, with the "·" before it
    Array.prototype.forEach.call(pub.querySelectorAll(".pub-meta .status"), function (pill) {
      var meta = pill.parentNode;
      var before = pill.previousSibling;
      if (before && before.nodeType === 3) {
        before.nodeValue = before.nodeValue.replace(/\s*·?\s*$/, "");
      }
      row.appendChild(pill);
      if (!meta.textContent.trim()) meta.parentNode.removeChild(meta);
    });

    if (row.children.length) body.insertBefore(row, body.firstChild);
  });

  buttons.forEach(function (button) {
    var count = document.createElement("span");
    count.className = "filter-count";
    button.appendChild(count);
  });

  function matches(pub, status, subject) {
    return (status === "all" || pub.dataset.status === status) &&
           (subject === "all" || subjectsOf(pub).indexOf(subject) !== -1);
  }

  // On phones each row scrolls sideways; bring the chosen button into view
  function reveal(button) {
    var row = button.parentNode;
    if (row.scrollWidth <= row.clientWidth) return;
    var edge = 16;
    var r = row.getBoundingClientRect();
    var b = button.getBoundingClientRect();
    var shift = 0;
    if (b.left < r.left + edge) shift = b.left - r.left - edge;
    else if (b.right > r.right - edge) shift = b.right - r.right + edge;
    if (shift) row.scrollLeft += shift;
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
      if (pressed) reveal(button);
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

  bar.hidden = false;
  readAddress();
  apply();
})();
