# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Render all dist files from palette + templates
just render

# Wipe dist/
just clean

# Render a single flavor
just render-morok   # pitch black
just render-popil   # warm ash

# Lint Python scripts (ruff + ty)
just lint-py

# Format Python scripts
just format-py

# Run the site dev server (Next.js, turbopack)
just dev

# Lint the site (Biome lint only)
just lint-next

# Full gate for the site (Biome check + Next build)
just check-next

# Format the site
just format-next
```

Top-level aggregates fan out to both halves: `just lint` = `lint-py` + `lint-next`, `just check` = `check-py` + `check-next`, `just format` = `format-py` + `format-next`, `just update` = `update-py` + `update-next`. `just build` runs `render`.

All Python tasks use `uv run`. The render step runs both `scripts/render.py` and `scripts/bundle.py`.

## Architecture

The repository hosts a single brand theme rendered in two flavors from two palette JSON sources against **one shared set of templates**, all under `themes/`. Flavors differ in their background ramp **and** foreground neutrals: `morok` (pitch black, near-white text on `#000000`) and `popil` (near-neutral dark-grey base `#1f1f1e`, faintly warm, with softened text). Accents (and every port template) are identical between them — accents are the shared brand thread. Shared Python tooling in `scripts/` renders any palette via `--palette`.

### Layout

```
pivoshenko.theme/
  scripts/                          # shared render + bundle scripts (Python, uv)
  pyproject.toml, uv.lock           # one Python env serves all palettes
  themes/
    palettes/morok.json             # pitch-black flavor — source of truth
    palettes/popil.json             # warm-ash flavor — source of truth
    templates/<tool>/               # Jinja templates per port (shared by both flavors)
    userstyles/styles/<site>/       # Less userstyles (morok bundle only)
    dist/<tool>/morok.<ext>         # generated artifacts (committed)
    dist/<tool>/popil.<ext>         #   both flavors land in the same dir
  site/                             # Next.js port showcase
  justfile, CLAUDE.md, ...
```

### Palettes

`themes/palettes/morok.json` and `themes/palettes/popil.json` each define all colors with `#rrggbb` hex values (including the `#` prefix). To change colors, edit the relevant palette. The **background ramp** (`surface2 surface1 surface0 base mantle crust`) and the **foreground neutrals** (`text subtext1 subtext0`) are forked between the two; keep **accents** (and `overlay*`) in sync across both unless deliberately forking. `morok` crust is true `#000000` with near-white text; `popil` anchors `base` to Claude-app grey `#1f1f1e` (near-neutral, faintly warm) with softened text (`text #e4e2de`).

### Templates

`themes/templates/<tool>/theme.<ext>.jinja` — Jinja2 templates that reference palette colors as `{{ color.hex }}` (full `#rrggbb` string) and the flavor name as `{{ name }}`. Available filters: `mix(color=..., amount=0.5)`, `get(key='hex')`, `rgb`. The `iif(cond, t, f)` global is available for conditionals. One template renders both flavors: `morok` → `themes/dist/<tool>/morok.<ext>`, `popil` → `themes/dist/<tool>/popil.<ext>`. Use `{{ name }}` (never a literal `morok`) for any in-file theme identifier (telegram `shortname`, bat scope, obsidian style-settings `id`s) so the shared template stays flavor-correct.

**Multi-file ports** (a tool with several fixed-name artifacts, e.g. `telegram` → `macos`/`desktop`/`ios`): use the verbatim form `themes/templates/<tool>/<name>.jinja` → `themes/dist/<tool>/<flavor>-<name>` (e.g. `themes/dist/telegram/morok-macos`, no extension). Triggered when the template basename has no dot and isn't `theme`. The `<flavor>-` prefix prevents the two palettes colliding in the shared dir. Tokenize hex literals to `{{ token.hex }}`; keep deliberately port-specific colors (e.g. telegram outgoing-bubble tints) and true-black opacity scrims (`#000000CC`) as literals.

### Web ports

Two ports target the brand's web stack:

- `themes/templates/tailwind/theme.js.jinja` → `themes/dist/tailwind/morok.js` (+ `popil.js`) — Tailwind preset (CommonJS) exposing `colors.<flavor>.<token>` and JetBrains Mono font stack. Consumed by `pivoshenko.ui/tailwind-preset` (vendored on release; sites import via `pivoshenko.ui/tailwind-preset` subpath).
- `themes/templates/css-vars/theme.css.jinja` → `themes/dist/css-vars/morok.css` (+ `popil.css`) — `:root` custom properties named `--<flavor>-<token>`. Consumed by the `pivoshenko-brand` skill's HTML reference and any plain-CSS surfaces.

### Userstyles

`themes/userstyles/styles/<site>/style.user.less` — Less-based userstyles for browser injection via Stylus. Each file has a `==UserStyle==` metadata header. They import the shared palette via a hosted gist URL and use `#lib.palette()` / `#lib.defaults()` mixins. `scripts/bundle.py` collects all `style.user.less` files and produces a Stylus import bundle.

Both flavors ship a bundle from the **same** single-copy style sources — they're never duplicated per flavor. The only per-flavor difference is the lib `@import` URL: each flavor hosts its own `lib.less` gist (identical accents, differing in the 6-color bg ramp + the 3 foreground neutrals `text`/`subtext1`/`subtext0`, keeping the `@morok` map name + `#lib` mixins so style files need no other change). The lib sources live at `themes/userstyles/lib/lib.less` (morok) and `themes/userstyles/lib/popil.less` (popil) — both hand-maintained mirrors, **gitignored** (`lib/`): they're the editing source for the hosted gists, not committed. A fresh clone won't have them; the committed artifact is the bundle (`themes/dist/stylus/*.json`), which references the gists by URL. Editing a lib means re-hosting its gist. `bundle.py`'s `--rewrite-import OLD NEW` swaps the morok gist URL for the flavor's own at bundle time:

- `morok` → `themes/dist/stylus/morok.json` (stock gist URL, no rewrite)
- `popil` → `themes/dist/stylus/popil.json` (rewrites to the popil lib gist via `--rewrite-import`)

The gist URLs are justfile vars (`morok_lib_url`, `popil_lib_url`). The hosted gists (owner `pivoshenko`):

- `morok` → gist `a4b48bfdc60be6a6a35ea5f3da732be1`, file `lib.less` (source: `themes/userstyles/lib/lib.less`)
- `popil` → gist `ee8090a682bb964031d51705d9ffd697`, file `popil.less` (source: `themes/userstyles/lib/popil.less`)

**`popil_lib_url` must point at a hosted raw URL of `popil.less`** before `just render-popil` produces a usable bundle — until that gist exists, the popil bundle's import won't resolve in Stylus. When a lib's bg ramp changes, **re-host that gist** (push the edited local `lib/*.less` to the gist above) and bump the matching justfile var to the new raw URL (the raw URL embeds a commit SHA that changes on every gist edit). The pinned SHA in the URL means the bundle keeps resolving the exact ramp it was built against until you bump it.

### Site

`site/` — Next.js app for visual preview of palette + ports. Managed separately with `pnpm` inside that directory. Renamed from `showcase/` to align with the `me/` repo convention where every web preview lives in `site/`.

Chrome is composed via `<PageShell brand="pivoshenko.theme">` from `pivoshenko.ui` (`Nav` + `Footer` + `ThemeToggle` + `ScrollToTop`). No local nav/footer/theme-toggle copies — see the shared UI invariant in `me/CLAUDE.md`.

## Key conventions

- Hex values in `themes/palettes/*.json` include the `#` prefix — templates do **not** add their own `#`.
- `render.py`'s `_normalize_template` replaces `=#{{` → `={{` to handle a common Tera-style mistake; avoid writing templates with `#{{ color.hex }}`.
- Userstyle `@var` options use `"value:Label*"` syntax where `*` marks the default.
- `render.py` derives templates + output dirs from the palette path: `palette.parent.parent / "templates"` and `/ "dist"`. With palettes at `themes/palettes/*.json`, both resolve to `themes/`, so all flavors share `themes/templates/` and write to `themes/dist/`. Pass `--templates-dir` / `--output-dir` to override. Consumers vendor `themes/dist/tailwind/morok.js` into their own repos on tag bumps.
- Adding a new flavor: drop `themes/palettes/<name>.json` (start from a copy, change `name` + the background ramp), add a `just render-<name>` recipe, and extend `render` to depend on it. Templates are shared — no new template dir.
- All files in `themes/dist/` are committed to git so downstream consumers don't need to run Python or `uv`.
- `just lint-py` runs `ruff check` + `ty check` only (no commit-message linting configured).
