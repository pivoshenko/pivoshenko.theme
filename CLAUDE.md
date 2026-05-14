# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Render all dist files from palette + templates
just render

# Wipe dist/
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

The repository generates theme files for ~20 tools from a single source of truth.

**Palette** — `palettes/morok.json`
Defines all colors with `#rrggbb` hex values (including the `#` prefix). This is the only file to edit when changing colors.

**Templates** — `templates/<tool>/theme.<ext>.jinja`
Jinja2 templates that reference palette colors as `{{ color.hex }}` (which outputs the full `#rrggbb` string). Available filters: `mix(color=..., amount=0.5)`, `get(key='hex')`, `rgb`. The `iif(cond, t, f)` global is available for conditionals. Templates render to `dist/<tool>/morok.<ext>`.

**Web ports** — `templates/tailwind/`, `templates/css-vars/`
Two ports targeting the brand's web stack:
- `tailwind/theme.js.jinja` → `dist/tailwind/morok.js` — Tailwind preset (CommonJS) exposing `colors.morok.<token>` and JetBrains Mono font stack. Consumed by `pivoshenko.ui/packages/tailwind-preset` (vendored on tag bumps).
- `css-vars/theme.css.jinja` → `dist/css-vars/morok.css` — `:root` custom properties named `--morok-<token>`. Consumed by the `pivoshenko-brand` skill's HTML reference and any plain-CSS surfaces.

**Userstyles** — `userstyles/styles/<site>/style.user.less`
Less-based userstyles for browser injection via Stylus. Each file has a `==UserStyle==` metadata header. They import the shared palette from `userstyles/lib/lib.less` via a hosted gist URL and use `#lib.palette()` / `#lib.defaults()` mixins. `scripts/bundle.py` collects all `style.user.less` files and produces `dist/stylus/morok.json` (Stylus import bundle).

**Site** — `site/`
Next.js app for visual preview of palette + ports. Managed separately with `pnpm` inside that directory. Renamed from `showcase/` to align with the `me/` repo convention where every web preview lives in `site/`.

## Key conventions

- Hex values in `palettes/morok.json` include the `#` prefix — templates do **not** add their own `#`.
- `render.py`'s `_normalize_template` replaces `=#{{` → `={{` to handle a common Tera-style mistake; avoid writing templates with `#{{ color.hex }}`.
- Userstyle `@var` options use `"value:Label*"` syntax where `*` marks the default.
- `render.py` writes only to `dist/` inside this repo. It SHALL NOT write into sibling repos — consumers vendor `dist/tailwind/morok.js` into their own repos on tag bumps. See `me/openspec/changes/shared-frontend-foundation/` for the full consumer pipeline.
- All files in `dist/` are committed to git so downstream consumers don't need to run Python or `uv`.
- Commit messages must follow Commitizen conventions (checked by `just lint-py` via `cz check`).
