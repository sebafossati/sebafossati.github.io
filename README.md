# Personal academic website

Plain HTML/CSS — no build tools, no dependencies. Edit a file, save, push:
that's the whole workflow.

## Files

| File | What it is |
|---|---|
| `index.html` | Landing page: intro, profile links, selected publications |
| `research.html` | Working papers + full publication list |
| `teaching.html` | Current and past courses |
| `assets/fossati_cv.pdf` | Your CV (pulled from your old site) |
| `assets/papers/` | Working-paper PDFs, appendices, and replication code |
| `assets/css/style.css` | All styling; colors/fonts are variables at the top (palette follows 1hand.app) |
| `assets/img/favicon.svg` | Browser-tab icon (navy tile with a two-tone "SF", after the 1hand.app icon) |
| `assets/js/theme.js` | The light/dark toggle (dark is the default) |
| `assets/img/portrait.jpg` | Your photo (pulled from your old site) |

## Common updates

**Add a publication** — in `index.html` (selected) or `research.html` (full
list), copy an entire `<li class="pub"> … </li>` block, paste it where you
want it (newest first), and edit the year, title, coauthors, journal, and
links. Delete any link (`Published version` / `Working paper` / `Code`) you
don't need. On the research page you can optionally include a
`<details class="abstract">` block for an expandable abstract.

The small icon on each link button is chosen automatically from the link
address: `doi.org` links get an arrow, `.zip` files and GitHub links get a code icon, and
everything else gets a document icon.

For working papers, the status pill is
`<span class="status">Submitted</span>`; use
`<span class="status status-wip">In progress</span>` for work in progress
(grey instead of gold).

**Update the CV** — overwrite `assets/fossati_cv.pdf` with the new file. Done.

**Add a course** — in `teaching.html`, copy a `<li class="card">` block
(current courses) or a plain `<li>` (past courses) and edit it.

**Replace the photo** — drop your photo in `assets/img/` (e.g.
`portrait.jpg`, roughly square, ≥400×400px) and change the `<img>` src in
`index.html` from `assets/img/portrait.svg` to `assets/img/portrait.jpg`.

**Social links** — in `index.html`, the `<ul class="socials">` list. Replace
each `href="#"` with your profile URL; delete rows you don't use.

**Change the colors** — the palette is borrowed from 1hand.app: a navy
ground, steel-blue buttons (`--primary`), pale-blue links, labels and chart
lines (`--accent`), and one gold highlight (`--gold`) for "Submitted" pills
and the highlighted series in the charts. Edit the variables at the top of
`assets/css/style.css`: the first block is the dark theme (the default),
the second is the light theme the toggle switches to. The brand tile in the
header and `assets/img/favicon.svg` use fixed navy colors; update those by
hand if you want them to match.

**Change the fonts** — the site uses the visitor's system sans (San
Francisco on Apple devices, Segoe UI on Windows), as 1hand.app does, so no
web fonts are loaded. Your name, page titles and small labels are set in
heavy, widely spaced capitals; the surname in the header and hero is
wrapped in `<span class="accent">` to draw it in the accent color. To use a
web font instead, add its Google Fonts `<link>` to the `<head>` of all
three pages and put its name first in `--font-sans` at the top of
`style.css`.

**Header charts** — the charts are faint, made-up decorations that pick up
the accent color automatically, with the series each chart is "about" (the
forecast origin, the counterfactual, the asymmetric loss, the fitted line)
drawn in gold. The landing page has an output series with
shaded recessions along the bottom of its tinted header; delete the
`<svg class="band-chart …"> … </svg>` block to remove it. Research and
Teaching share a row of five same-size cards running behind the title, one
chart per card: a forecast fan chart, the output series, an actual vs.
counterfactual series around a policy date, loss functions, and a scatter
plot with a regression line. The cards are
listed right to left in the HTML: the first sits at the far right and always
shows, and more appear as the window gets wider. A card behind the title is
drawn fainter. Phones show the title only.
To reorder or drop a chart, move or delete its `<svg class="head-card …">`
block (in both pages).

**Nav / footer** — these are duplicated across the three HTML pages, so make
the same edit in all three files.

## Content status

All content was pulled from your existing UAlberta site (publications,
working papers, teaching, contact info, CV, and photo). Two things to
double-check:

- **Profile links** on the landing page are now icon buttons (Email, Google
  Scholar, ORCID, LinkedIn, X, Bluesky, CV). Each `<li>` in the `<ul class="socials">`
  list holds one inline SVG glyph; to add a service, copy a `<li>`, change the
  `href`/`aria-label`/`title`, and paste a new 24×24 `<path>` from
  <https://simpleicons.org>. Please confirm the **LinkedIn**, **X**
  (@sebafossati), and **Bluesky** (@sebafossati.bsky.social) handles are yours.
- The working-paper PDFs and code now live in `assets/papers/` (copied from
  your old server), so the new site is self-contained and needs no link back
  to the old one.

## Preview locally

```sh
cd path/to/Website
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Deploy to GitHub Pages

One-time setup:

1. Create a GitHub repo named `sebafossati.github.io` (public).
2. In this folder:
   ```sh
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/sebafossati/sebafossati.github.io.git
   git push -u origin main
   ```
3. The site appears at `https://sebafossati.github.io` within a minute or two.
   (If not, check Settings → Pages → deploy from `main` branch.)

After that, publishing an update is just:

```sh
git add . && git commit -m "Update site" && git push
```

The `.nojekyll` file tells GitHub Pages to serve the files as-is — leave it
in place.
