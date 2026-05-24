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

# Lint Python scripts
just lint-py

# Format Python scripts
just format-py

# Run the site dev server (Next.js, turbopack)
just dev-next

# Lint/build the site (Next.js)
just lint-next

# Format the site
just format-next
```

All Python tasks use `uv run`. The render step runs both `scripts/render.py` and `scripts/bundle.py`.

## Architecture

The repository hosts a single brand theme rendered in two flavors from two palette JSON sources against **one shared set of templates**, all under `themes/`. Flavors differ only in their background ramp: `morok` (pitch black, neutral greys on `#000000`) and `popil` (warm ash off-black). Accents, neutrals, and every port template are identical between them. Shared Python tooling in `scripts/` renders any palette via `--palette`.

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

`themes/palettes/morok.json` and `themes/palettes/popil.json` each define all colors with `#rrggbb` hex values (including the `#` prefix). To change colors, edit the relevant palette. **Only the background ramp** (`surface2 surface1 surface0 base mantle crust`) differs between the two; keep accents and neutrals in sync across both unless deliberately forking a flavor. `morok` crust is true `#000000` with neutral greys; `popil` uses a warm-tinted ramp lifted off black.

### Templates

`themes/templates/<tool>/theme.<ext>.jinja` — Jinja2 templates that reference palette colors as `{{ color.hex }}` (full `#rrggbb` string) and the flavor name as `{{ name }}`. Available filters: `mix(color=..., amount=0.5)`, `get(key='hex')`, `rgb`. The `iif(cond, t, f)` global is available for conditionals. One template renders both flavors: `morok` → `themes/dist/<tool>/morok.<ext>`, `popil` → `themes/dist/<tool>/popil.<ext>`. Use `{{ name }}` (never a literal `morok`) for any in-file theme identifier (telegram `shortname`, bat scope, obsidian style-settings `id`s) so the shared template stays flavor-correct.

**Multi-file ports** (a tool with several fixed-name artifacts, e.g. `telegram` → `macos`/`desktop`/`ios`): use the verbatim form `themes/templates/<tool>/<name>.jinja` → `themes/dist/<tool>/<flavor>-<name>` (e.g. `themes/dist/telegram/morok-macos`, no extension). Triggered when the template basename has no dot and isn't `theme`. The `<flavor>-` prefix prevents the two palettes colliding in the shared dir. Tokenize hex literals to `{{ token.hex }}`; keep deliberately port-specific colors (e.g. telegram outgoing-bubble tints) and true-black opacity scrims (`#000000CC`) as literals.

### Web ports

Two ports target the brand's web stack:

- `themes/templates/tailwind/theme.js.jinja` → `themes/dist/tailwind/morok.js` (+ `popil.js`) — Tailwind preset (CommonJS) exposing `colors.<flavor>.<token>` and JetBrains Mono font stack. Consumed by `pivoshenko.ui/tailwind-preset` (vendored on release; sites import via `pivoshenko.ui/tailwind-preset` subpath).
- `themes/templates/css-vars/theme.css.jinja` → `themes/dist/css-vars/morok.css` (+ `popil.css`) — `:root` custom properties named `--<flavor>-<token>`. Consumed by the `pivoshenko-brand` skill's HTML reference and any plain-CSS surfaces.

### Userstyles

`themes/userstyles/styles/<site>/style.user.less` — Less-based userstyles for browser injection via Stylus. Each file has a `==UserStyle==` metadata header. They import the shared palette from `themes/userstyles/lib/lib.less` via a hosted gist URL and use `#lib.palette()` / `#lib.defaults()` mixins. `scripts/bundle.py` collects all `style.user.less` files and produces `themes/dist/stylus/morok.json` (Stylus import bundle). Userstyles are morok-only for now (the hosted gist carries the morok palette); popil ships no stylus bundle.

### Site

`site/` — Next.js app for visual preview of palette + ports. Managed separately with `pnpm` inside that directory. Renamed from `showcase/` to align with the `me/` repo convention where every web preview lives in `site/`.

Chrome is composed via `<PageShell brand="pivoshenko.theme">` from `pivoshenko.ui` (`Nav` + `Footer` + `ThemeToggle` + `ScrollToTop`). No local nav/footer/theme-toggle copies — see the shared UI invariant in `me/CLAUDE.md`.

## Key conventions

- Hex values in `themes/palettes/*.json` include the `#` prefix — templates do **not** add their own `#`.
- `render.py`'s `_normalize_template` replaces `=#{{` → `={{` to handle a common Tera-style mistake; avoid writing templates with `#{{ color.hex }}`.
- Userstyle `@var` options use `"value:Label*"` syntax where `*` marks the default.
- `render.py` derives templates + output dirs from the palette path: `palette.parent.parent / "templates"` and `/ "dist"`. With palettes at `themes/palettes/*.json`, both resolve to `themes/`, so all flavors share `themes/templates/` and write to `themes/dist/`. Pass `--templates-dir` / `--output-dir` to override. Consumers vendor `themes/dist/tailwind/morok.js` into their own repos on tag bumps. See `me/openspec/changes/shared-frontend-foundation/` for the full consumer pipeline.
- Adding a new flavor: drop `themes/palettes/<name>.json` (start from a copy, change `name` + the background ramp), add a `just render-<name>` recipe, and extend `render` to depend on it. Templates are shared — no new template dir.
- All files in `themes/dist/` are committed to git so downstream consumers don't need to run Python or `uv`.
- Commit messages must follow Commitizen conventions (checked by `just lint-py` via `cz check`).
