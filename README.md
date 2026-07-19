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
| `assets/css/style.css` | All styling; colors/fonts are variables at the top |
| `assets/js/theme.js` | The light/dark toggle |
| `assets/img/portrait.jpg` | Your photo (pulled from your old site) |

## Common updates

**Add a publication** — in `index.html` (selected) or `research.html` (full
list), copy an entire `<li class="pub"> … </li>` block, paste it where you
want it (newest first), and edit the year, title, coauthors, journal, and
links. Delete any link (`Published version` / `Working paper` / `Code`) you
don't need. On the research page you can optionally include a
`<details class="abstract">` block for an expandable abstract.

**Update the CV** — overwrite `assets/fossati_cv.pdf` with the new file. Done.

**Add a course** — in `teaching.html`, copy a `<li class="card">` block
(current courses) or a plain `<li>` (past courses) and edit it.

**Replace the photo** — drop your photo in `assets/img/` (e.g.
`portrait.jpg`, roughly square, ≥400×400px) and change the `<img>` src in
`index.html` from `assets/img/portrait.svg` to `assets/img/portrait.jpg`.

**Social links** — in `index.html`, the `<ul class="socials">` list. Replace
each `href="#"` with your profile URL; delete rows you don't use.

**Change the accent color** — edit `--accent` (and `--accent-soft`) at the
top of `assets/css/style.css`. There are two places: the light block and the
dark blocks. Also update the fill color in `assets/img/favicon.svg` if you
want the favicon to match.

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

1. Create a GitHub repo named `USERNAME.github.io` (public).
2. In this folder:
   ```sh
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:USERNAME/USERNAME.github.io.git
   git push -u origin main
   ```
3. The site appears at `https://USERNAME.github.io` within a minute or two.
   (If not, check Settings → Pages → deploy from `main` branch.)

After that, publishing an update is just:

```sh
git add . && git commit -m "Update site" && git push
```

The `.nojekyll` file tells GitHub Pages to serve the files as-is — leave it
in place.
