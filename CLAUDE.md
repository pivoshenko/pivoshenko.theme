# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**pivoshenko.theme** is a color palette-driven theme generator. A single JSON palette (`palettes/morok.json`) defines 26 colors that get rendered into themes for 22+ terminal/editor applications and 133+ website userstyles via Jinja2 templates and LESS.

## Commands

All tasks are run via `just`:

```sh
just render       # Generate all theme files (main build: render.py + bundle.py)
just format       # Format Python + Next.js code
just lint         # Lint everything (Python type check, ruff, commitizen, Biome, Next.js build)
just update       # Update Python and Node dependencies
```

Individual targets:
```sh
just format-py    # ruff format + pyupgrade
just lint-py      # ty check + ruff check + cz check
just format-next  # pnpm format in showcase/
just lint-next    # biome check + next build in showcase/
```

Showcase (Next.js in `showcase/`):
```sh
pnpm dev    # Dev server with Turbopack
pnpm build  # Production build
```

## Architecture

### Theme Generation Pipeline

```
palettes/morok.json (26 colors, source of truth)
        ↓
scripts/render.py  →  templates/**/*.jinja  →  dist/<app>/<theme>.<ext>
scripts/bundle.py  →  userstyles/styles/**/style.user.less  →  dist/stylus/morok.json
```

- **`palettes/morok.json`** — the single source of truth for all 26 palette colors
- **`templates/`** — Jinja2 templates, one per supported application (Ghostty, Helix, VSCode, etc.)
- **`scripts/render.py`** — reads the palette, applies custom Jinja2 filters (`mix`, `rgb`, `get`), renders templates to `dist/`
- **`scripts/bundle.py`** — parses UserCSS metadata from 133 LESS files, produces a Stylus-compatible JSON bundle
- **`userstyles/lib/lib.less`** — shared LESS library imported by all website userstyles
- **`dist/`** — generated output, not hand-edited

### Jinja2 Template Conventions

Templates receive all 26 palette colors as context variables. Available filters and helpers:
- `{{ color.hex }}` — hex value of a color
- `{{ color | mix(another_color, 0.45) | get('hex') }}` — mix two colors
- `{{ color | rgb }}` — RGB tuple
- `{{ if(cond=flavor.dark, t=value_if_dark, f=value_if_light) }}` — conditional

### Userstyle Conventions

Each `userstyles/styles/<site>/style.user.less` contains a UserCSS metadata block with `@var` definitions followed by LESS importing the shared lib:

```less
/* ==UserStyle==
@name Site Name
@var select accentColor "Accent" [...]
==/UserStyle== */

@import "shared-lib.less";

@-moz-document domain("example.com") {
  :root { #morok(@darkFlavor, @accentColor); }
}
```

### Showcase (Next.js)

`showcase/` is a Next.js 16 / React 19 / Tailwind CSS app deployed on Vercel. It displays the color palette and all supported application ports. Uses Biome for linting/formatting (not ESLint/Prettier).

## Toolchain

| Purpose                   | Tool                                                     |
| ------------------------- | -------------------------------------------------------- |
| Python package manager    | `uv`                                                     |
| Python linting/formatting | `ruff`, `ty` (type check)                                |
| JS/TS linting/formatting  | Biome                                                    |
| JS package manager        | `pnpm`                                                   |
| Task runner               | `just`                                                   |
| Commits                   | Commitizen (conventional commits enforced by `cz check`) |
