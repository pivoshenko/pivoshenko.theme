# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single brand color theme, defined as **three flavors** (`morok`, `popil`, `vatra`), rendered from
palette JSON into **26 tool-specific artifacts** (bat, ghostty, helix, k9s, zed, telegram, tailwind,
CSS tokens, …) plus a bundled set of browser userstyles. Everything generated is committed under
`themes/dist/` so consumers never need Python.

Two independent halves:
- **Python** (`scripts/`, `uv`) — the renderer/bundler. Owns `themes/`.
- **Next.js** (`site/`, `pnpm`) — the preview site at `theme.pivoshenko.dev`. Reads `themes/` at build time.

`just` recipes fan out to both halves.

## Commands

```bash
just                 # list recipes

just install         # install-py (uv sync --all-groups --all-extras) + install-next (pnpm -C site install)
just render          # regenerate all of themes/dist/ for all three flavors  (alias: just build)
just render-morok    # single flavor: render.py + bundle.py for that palette
just render-popil
just render-vatra
just clean           # rm -rf themes/dist

just dev             # pnpm -C site dev  (next dev --turbopack)
just start           # site build + next start
just build-next      # site production build

just lint            # lint-py (ruff check . + ty check .) + lint-next (biome lint .)
just format          # format-py (pyupgrade --py313-plus + ruff format .) + format-next (biome format --write)
just check           # check-py (== lint-py) + check-next (biome check --write + next build)
just audit           # uvx pip-audit + pnpm -C site audit
just test            # no-op, see below
just update          # uv lock --upgrade + uvx uv-upsync + pnpm -C site update
```

Render a palette manually (what the `render-*` recipes wrap):

```bash
uv run scripts/render.py --palette themes/palettes/popil.json
uv run scripts/bundle.py --styles-dir themes/userstyles/styles \
  --output themes/dist/stylus/popil.json \
  --rewrite-import "<morok_lib_url>" "<popil_lib_url>"
```

### Testing

There are no tests. `test-py` and `test-next` check for a `.no-tests` sentinel file at the repo root:
present → print "skipping" and exit 0; absent → error. The sentinel is committed, so `just test` is
currently a green no-op. Adding real tests means deleting `.no-tests` and replacing the recipe bodies.

### Tooling notes

- Python lint/format/audit run through `uvx` (ephemeral, no venv needed). Only the render scripts use
  `uv run` because they import `jinja2` / `loguru` from the project env.
- `lint-py` is `ruff check` + `ty check` only — there is deliberately **no** `ruff format --check`.
- Ruff config lives in `pyproject.toml`: `select = ["ALL"]`, line length 100, `fix = true`,
  `unsafe-fixes = true`, isort forces single-line imports and a required `from __future__ import annotations`.
- CI (`.github/workflows/ci.yaml`) runs two parallel jobs on `ubuntu-24.04-arm`:
  `ci-py` = install-py → lint-py → audit-py → test-py; `ci-next` = install-next → lint-next →
  audit-next → test-next → build-next. **CI never runs `just render`** — regenerating `themes/dist/`
  and committing it is a manual step after touching a palette or template.

## Architecture

### Render pipeline

`scripts/render.py` is the whole engine (~250 lines, no package structure):

1. Loads `--palette <path>.json`.
2. Derives dirs from the palette path: `<palette>.parent.parent / "templates"` and `/ "dist"`.
   With palettes at `themes/palettes/*.json`, all flavors share `themes/templates/` and write into
   `themes/dist/`. Override with `--templates-dir` / `--output-dir`.
3. Builds a Jinja context: every `colors` key as a top-level `SimpleNamespace(hex=...)`, the `roles`
   tree as a nested namespace under `role`, plus `name` (flavor name) and `flavor.dark` / `flavor.light`.
4. `rglob("*.jinja")` over the templates dir, renders each with `StrictUndefined` (a typo in a color
   name is a hard failure), writes `rstrip() + "\n"`.

**Output path rules** (`_render_target_from_template`):

| template | output |
| --- | --- |
| `templates/<tool>/theme.<ext>.jinja` | `dist/<tool>/<flavor>.<ext>` |
| `templates/<tool>/<tool>.<ext>.jinja` | `dist/<tool>/<flavor>.<ext>` |
| `templates/<tool>/<name>.jinja` (no dot, not `theme`) | `dist/<tool>/<flavor>-<name>` (no extension) |
| `templates/<tool>.<ext>.jinja` (legacy flat) | `dist/<tool>/<flavor>.<ext>` |

The third form is for multi-file ports whose artifacts have fixed names — `telegram/{desktop,ios,macos}.jinja`
→ `dist/telegram/morok-desktop`, `popil-ios`, …. The `<flavor>-` prefix keeps flavors from colliding in
the shared `dist/<tool>/` dir. A dotted basename that matches neither `<tool>.` nor `theme.` is used
whole as the extension — that is how `obsidian/manifest.json.jinja` → `dist/obsidian/<flavor>.manifest.json`
and `zen/userChrome.css.jinja` → `dist/zen/<flavor>.userChrome.css` emit two files per tool.

### Palettes

`themes/palettes/{morok,popil,vatra}.json`, each with `name`, `flavor` ("dark"), and two blocks:

- **`colors`** — 26 identical keys across all three flavors: the 14 Catppuccin-style hues
  (`rosewater` … `lavender`), `text`/`subtext1`/`subtext0`, `overlay2..0`, `surface2..0`,
  `base`/`mantle`/`crust`. Values are `#rrggbb` **including the `#`** — templates must not add one.
- **`roles`** — semantic layer, each value is a *string naming a `colors` key*:
  `bg.{canvas,surface,raised,sunken,overlay}`, `fg.{default,muted,subtle,faint}`,
  `border.{subtle,default,strong}`, `accent.{primary,secondary,success,warning,danger,info}`.

Flavor identity lives in `roles` + the bg ramp:

| flavor | base / crust | accent.primary | character |
| --- | --- | --- | --- |
| `morok` | `#111111` / `#000000` | `blue` `#7f98bf` | pitch black, cool Catppuccin-frappe accents |
| `popil` | `#1f1f1e` / `#151514` | `peach` `#d97757` | warm ash, muted terracotta — the house brand flavor |
| `vatra` | `#1f1f1e` / `#151514` | `peach` `#ec7f3e` | same ramp as popil, golden-tan subtext, gruvbox-material orange |

Because the slot *names* are shared, one template set serves every flavor.

### Templates

`themes/templates/<tool>/*.jinja`, Jinja2. Available in scope:

- `{{ <colorname>.hex }}` — e.g. `{{ mauve.hex }}`, `{{ base.hex }}`
- `{{ role.<group>.<key>.hex }}` — e.g. `{{ role.accent.primary.hex }}`
- `{{ name }}` — the flavor name; **always use this** for in-file theme identifiers (telegram
  `shortname`, bat scope, obsidian style-settings ids) so one template stays flavor-correct
- `{{ flavor.dark }}` / `{{ flavor.light }}`
- filters `| mix(color=..., amount=0.5)`, `| get(key='hex')`, `| rgb` (returns `"r, g, b"`)
- global `iif(cond, t, f)`

`_normalize_template` rewrites `{{ if(` → `{{ iif(` and `=#{{` → `={{` before compiling — don't write
`=#{{ color.hex }}`, the `#` is already in the hex value.

**Prefer `role.*` over raw color names** in any new web/UI template so a flavor swap re-resolves color
intent. Ports targeting apps with literal-hue expectations (zed, discord, obsidian) read `colors` directly.

### Web-facing ports

Four of the 26 targets feed the pivoshenko.* frontend stack. Use the **token** pair for new work:

- `tokens/theme.css.jinja` → `dist/tokens/<flavor>.css` — role-based custom properties
  (`--bg-canvas`, `--fg-default`, `--accent-primary`) scoped to `[data-flavor="<flavor>"]`, values as
  space-separated `R G B` triples (no `rgb()` wrapper) for Tailwind `<alpha-value>` support. Switch
  flavor at runtime via `document.documentElement.dataset.flavor`.
- `tailwind-tokens/theme.js.jinja` → `dist/tailwind-tokens/<flavor>.js` — flavor-agnostic CommonJS
  Tailwind preset consuming those vars via `rgb(var(--token) / <alpha-value>)`. The three output files
  are byte-identical; any one works.
- `tailwind/theme.js.jinja` → `dist/tailwind/<flavor>.js` — **legacy** preset exposing raw
  `colors.<flavor>.<token>` (`bg-morok-base`). Still vendored by `pivoshenko.ui/tailwind-preset`.
- `css-vars/theme.css.jinja` → `dist/css-vars/<flavor>.css` — **legacy** `:root` props named
  `--<flavor>-<token>`.

`preview/theme.html.jinja` → `dist/preview/<flavor>.html` is a self-contained page for eyeballing a
flavor in a browser.

### Userstyles

`themes/userstyles/styles/<site>/style.user.less` — 133 Less userstyles, each with a `==UserStyle==`
metadata header and a single `@import` of a hosted `lib.less` gist providing `#lib.palette()` /
`#lib.defaults()`. `scripts/bundle.py` parses those headers (including `@var` lines, where select
options use `"value:Label*"` and `*` marks the default), computes a SHA-1 `originalDigest`, and emits a
Stylus import JSON.

**The style sources are single-copy — never duplicated per flavor.** The only per-flavor difference is
the lib import URL, swapped at bundle time by `--rewrite-import OLD NEW`:

| flavor | gist | lib source (gitignored) |
| --- | --- | --- |
| morok | `a4b48bfdc60be6a6a35ea5f3da732be1` / `lib.less` | `themes/userstyles/lib/lib.less` |
| popil | `ee8090a682bb964031d51705d9ffd697` / `popil.less` | `themes/userstyles/lib/popil.less` |
| vatra | `4966a9fda130dbd531f9884c11ae156b` / `vatra.less` | `themes/userstyles/lib/vatra.less` |

`themes/userstyles/lib/` is **gitignored** (`.gitignore:239`) — those files are hand-maintained local
mirrors of the gists, not the source of truth. A fresh clone won't have them; the committed artifact is
`themes/dist/stylus/*.json`, which references the gists by URL. The raw URLs (pinned to a gist commit
SHA) live as justfile variables `morok_lib_url` / `popil_lib_url` / `vatra_lib_url`. **Editing a lib
means re-pushing its gist and bumping the matching justfile var to the new SHA-bearing raw URL** — the
pin is what keeps a bundle resolving the exact ramp it was built against.

### Site

`site/` is a Next.js 16 App Router app (React 19, Tailwind 3, Biome, pnpm), reading `../themes/` from
disk at build time via `site/lib/theme-data.ts` (`getPalette`, `getPorts`, `getPortContent`). Nearly all
chrome is delegated to `pivoshenko.ui` (pinned as a GitHub dep): `layout.tsx` renders
`<SiteLayout brand="pivoshenko.theme">`, and `tailwind.config.ts`, `next.config.ts`,
`postcss.config.mjs`, `biome.json`, `app/globals.css`, `app/icon.tsx`, `app/opengraph-image.tsx` are all
one-line re-exports of shared subpaths.

Two independent contexts drive interactivity, both in `site/lib/`:
- `flavor-context.tsx` — `FlavorProvider` / `useFlavor()`, switches which **content** palette the wall,
  table, examples, and terminal mock render. The site **chrome is fixed** on the pivoshenko.ui look and
  never follows this toggle; there is no light mode and no `next-themes`.
- `accent-context.tsx` — `useAccent()`, the pin + copy-hex interaction on the palette wall.

`components/palette-wall.tsx` renders arbitrary palette hexes, so its swatch labels use an absolute
light/dark contrast pair computed from `lib/contrast.ts` — the one justified exception to role tokens.
`components/examples.tsx` pre-renders Shiki HTML per flavor on the server (`lib/shiki-theme.ts` builds a
theme from a palette map) and hands the three sets to `examples-client.tsx`.

## Conventions

- Adding a flavor: drop `themes/palettes/<name>.json` (copy an existing one, change `name`, the bg ramp,
  and `roles.accent`), add a `render-<name>` recipe with its own lib gist + `--rewrite-import`, and add
  it to the `render` dependency list. No new templates.
- Adding a port: create `themes/templates/<tool>/theme.<ext>.jinja`, run `just render`, add install
  steps to the README, and optionally add `<tool>` to `readmeAnchors`/`portSwatches`/`portIcons` in
  `site/lib/theme-data.ts` and `site/components/ports-grid.tsx`.
- `themes/dist/` is committed. Re-run `just render` and commit the diff whenever a palette or template
  changes — nothing in CI does it for you.
- Python module docstrings in `scripts/` open with `Module that contains ...`.
- Code comments never end with a period.
