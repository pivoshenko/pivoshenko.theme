# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Render all dist files from palette + templates
just render

# Wipe morok/dist
just clean

# Lint Python scripts
just lint-py

# Format Python scripts
just format-py

# Lint/build the site (Next.js)
just lint-next

# Format the site
just format-next
```

All Python tasks use `uv run`. The render step runs both `scripts/render.py` and `scripts/bundle.py`.

## Architecture

The repository hosts brand themes generated from palette JSON sources. Each palette is a self-contained directory at the repo root; today there is one (`morok/`). Shared Python tooling lives at the root and operates against any palette via CLI flags.

### Layout

```
pivoshenko.theme/
  scripts/                  # shared render + bundle scripts (Python, uv)
  pyproject.toml, uv.lock   # one Python env serves all palettes
  morok/                    # the morok palette + its outputs
    palettes/morok.json     # source of truth — colors, name, flavor
    templates/<tool>/       # Jinja templates per port
    userstyles/styles/<site>/
    dist/<tool>/morok.<ext> # generated artifacts (committed)
  site/                     # Next.js port showcase (renamed from showcase/)
  justfile, CLAUDE.md, ...
```

### Palette

`morok/palettes/morok.json` defines all colors with `#rrggbb` hex values (including the `#` prefix). This is the only file to edit when changing colors.

### Templates

`morok/templates/<tool>/theme.<ext>.jinja` — Jinja2 templates that reference palette colors as `{{ color.hex }}` (which outputs the full `#rrggbb` string). Available filters: `mix(color=..., amount=0.5)`, `get(key='hex')`, `rgb`. The `iif(cond, t, f)` global is available for conditionals. Templates render to `morok/dist/<tool>/morok.<ext>`.

### Web ports

Two ports target the brand's web stack:

- `morok/templates/tailwind/theme.js.jinja` → `morok/dist/tailwind/morok.js` — Tailwind preset (CommonJS) exposing `colors.morok.<token>` and JetBrains Mono font stack. Consumed by `pivoshenko.ui/tailwind-preset` (vendored on release; sites import via `pivoshenko.ui/tailwind-preset` subpath).
- `morok/templates/css-vars/theme.css.jinja` → `morok/dist/css-vars/morok.css` — `:root` custom properties named `--morok-<token>`. Consumed by the `pivoshenko-brand` skill's HTML reference and any plain-CSS surfaces.

### Userstyles

`morok/userstyles/styles/<site>/style.user.less` — Less-based userstyles for browser injection via Stylus. Each file has a `==UserStyle==` metadata header. They import the shared palette from `morok/userstyles/lib/lib.less` via a hosted gist URL and use `#lib.palette()` / `#lib.defaults()` mixins. `scripts/bundle.py` collects all `style.user.less` files and produces `morok/dist/stylus/morok.json` (Stylus import bundle).

### Site

`site/` — Next.js app for visual preview of palette + ports. Managed separately with `pnpm` inside that directory. Renamed from `showcase/` to align with the `me/` repo convention where every web preview lives in `site/`.

## Key conventions

- Hex values in `morok/palettes/morok.json` include the `#` prefix — templates do **not** add their own `#`.
- `render.py`'s `_normalize_template` replaces `=#{{` → `={{` to handle a common Tera-style mistake; avoid writing templates with `#{{ color.hex }}`.
- Userstyle `@var` options use `"value:Label*"` syntax where `*` marks the default.
- `render.py` derives output dir from the palette path: `palette.parent.parent / "dist"`. Pass `--palette <path>` and `--templates-dir` / `--output-dir` to override. The script writes only inside the palette's directory tree — never into sibling repos. Consumers vendor `morok/dist/tailwind/morok.js` into their own repos on tag bumps. See `me/openspec/changes/shared-frontend-foundation/` for the full consumer pipeline.
- Adding a new palette: create `<name>/palettes/<name>.json`, `<name>/templates/`, optional `<name>/userstyles/`. Add a `just render-<name>` recipe (or extend `render`) to invoke the scripts against the new palette path.
- All files in `morok/dist/` are committed to git so downstream consumers don't need to run Python or `uv`.
- Commit messages must follow Commitizen conventions (checked by `just lint-py` via `cz check`).
