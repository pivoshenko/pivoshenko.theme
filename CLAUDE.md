# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

One brand color theme in **three flavors** (`morok`, `popil`, `vatra`), rendered from palette JSON
through shared Jinja templates into **26 tool-specific ports** under `themes/dist/` (bat, ghostty,
helix, zed, telegram, tailwind, CSS tokens, …), plus 133 browser userstyles bundled into Stylus
import JSONs. Everything generated is **committed** under `themes/dist/` so consumers never run Python.

Two independent halves, fanned out by `just`:

- **Python** (`scripts/`, managed by `uv`, Python ≥3.13) — the renderer/bundler. Owns `themes/`.
- **Next.js** (`site/`, managed by `pnpm`) — the preview site at `theme.pivoshenko.dev`. Reads
  `../themes/` from disk at build time.

## Commands

```bash
just                 # list recipes

just install         # install-py (uv sync --all-groups --all-extras) + install-next (pnpm -C site install)
just render          # regenerate all of themes/dist/ for all three flavors  (alias: just build)
just render-morok    # single flavor: render.py + bundle.py for that palette (also -popil, -vatra)
just clean           # rm -rf themes/dist

just dev             # pnpm -C site dev  (next dev --turbopack)
just start           # pnpm -C site build && pnpm -C site start
just build-next      # site production build only

just lint            # lint-py (uvx ruff check . + uvx ty check .) + lint-next (biome lint .)
just format          # format-py (uvx pyupgrade --py313-plus + uvx ruff format .) + format-next (biome format --write)
just check           # check-py (== lint-py) + check-next (biome check --write + next build)
just audit           # uvx pip-audit + pnpm -C site audit
just test            # sentinel no-op, see Testing
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

There are no tests. `test-py` / `test-next` check for the committed `.no-tests` sentinel at the repo
root: present → "skipping", exit 0; absent → error. Adding real tests means deleting `.no-tests` and
replacing those recipe bodies.

### Tooling notes

- Python lint/format/audit run through `uvx` (ephemeral). Only `scripts/*.py` need the project env
  (`uv run`) because they import `jinja2` / `loguru`.
- `lint-py` is `ruff check` + `ty check` — deliberately no `ruff format --check`.
- Ruff config in `pyproject.toml`: `select = ["ALL"]`, line length 100, `fix = true`,
  `unsafe-fixes = true`, isort forces single-line imports and `from __future__ import annotations`.
- CI (`.github/workflows/ci.yaml`) runs two parallel jobs on `ubuntu-24.04-arm`:
  `ci-py` = install-py → lint-py → audit-py → test-py; `ci-next` = install-next → lint-next →
  audit-next → test-next → build-next. **CI never runs `just render`** — regenerating `themes/dist/`
  and committing the diff is a manual step after touching a palette or template.

## Architecture

### Render pipeline

`scripts/render.py` is the whole engine (single file, no package):

1. Loads `--palette <path>.json`.
2. Derives dirs from the palette path: `<palette>.parent.parent / "templates"` and `/ "dist"` —
   so all flavors under `themes/palettes/` share `themes/templates/` and write into `themes/dist/`.
   Override with `--templates-dir` / `--output-dir`.
3. Builds a Jinja context: every `colors` key as a top-level `SimpleNamespace(hex=...)`, the `roles`
   tree as nested namespaces under `role`, plus `name` and `flavor.dark` / `flavor.light`.
4. `rglob("*.jinja")` over the templates dir, renders each with `StrictUndefined` (a typo in a color
   name is a hard failure), writes `rstrip() + "\n"`.

**Output path rules** (`_render_target_from_template`):

| template | output |
| --- | --- |
| `templates/<tool>/theme.<ext>.jinja` | `dist/<tool>/<flavor>.<ext>` |
| `templates/<tool>/<tool>.<ext>.jinja` | `dist/<tool>/<flavor>.<ext>` |
| `templates/<tool>/<name>.jinja` (no dot, not `theme`) | `dist/<tool>/<flavor>-<name>` (no extension) |
| `templates/<tool>.<ext>.jinja` (legacy flat) | `dist/<tool>/<flavor>.<ext>` |

The third form serves multi-file ports with fixed artifact names — `telegram/{desktop,ios,macos}.jinja`
→ `dist/telegram/morok-desktop`, `popil-ios`, …; the `<flavor>-` prefix keeps flavors from colliding.
A dotted basename matching neither `<tool>.` nor `theme.` is used whole as the extension — that is how
`obsidian/manifest.json.jinja` → `dist/obsidian/<flavor>.manifest.json` and
`zen/userChrome.css.jinja` → `dist/zen/<flavor>.userChrome.css` emit multiple files per tool.

### Palettes

`themes/palettes/{morok,popil,vatra}.json`, each with `name`, `flavor` ("dark"), and two blocks:

- **`colors`** — 26 identical keys across flavors: 14 Catppuccin-style hues (`rosewater` …
  `lavender`), `text`/`subtext1`/`subtext0`, `overlay2..0`, `surface2..0`, `base`/`mantle`/`crust`.
  Values are `#rrggbb` **including the `#`** — templates must not add one.
- **`roles`** — semantic layer; each value is a *string naming a `colors` key*:
  `bg.{canvas,surface,raised,sunken,overlay}`, `fg.{default,muted,subtle,faint}`,
  `border.{subtle,default,strong}`, `accent.{primary,secondary,success,warning,danger,info}`.

Flavor identity lives in the values, not the slots:

| flavor | base / crust | accent.primary | character |
| --- | --- | --- | --- |
| `morok` | `#111111` / `#000000` | `blue` `#7f98bf` | pitch black, cool Catppuccin-frappe accents |
| `popil` | `#1f1f1e` / `#151514` | `peach` `#d97757` | warm ash, muted terracotta — the house brand flavor |
| `vatra` | `#1f1f1e` / `#151514` | `peach` `#ec7f3e` | popil's ramp with golden-tan subtext, gruvbox-material orange |

Because slot names are shared, one template set serves every flavor.

### Templates

`themes/templates/<tool>/*.jinja`, Jinja2. In scope:

- `{{ <colorname>.hex }}` — e.g. `{{ mauve.hex }}`
- `{{ role.<group>.<key>.hex }}` — e.g. `{{ role.accent.primary.hex }}`
- `{{ name }}` — the flavor name; **always use it** for in-file theme identifiers (telegram
  `shortname`, obsidian ids) so one template stays flavor-correct
- `{{ flavor.dark }}` / `{{ flavor.light }}`
- filters `| mix(color=..., amount=0.5)`, `| get(key='hex')`, `| rgb` (returns `"r, g, b"`);
  global `iif(cond, t, f)`

`_normalize_template` rewrites `{{ if(` → `{{ iif(` and `=#{{` → `={{` before compiling — never write
`=#{{ color.hex }}`, the `#` is already in the hex value.

Prefer `role.*` over raw color names in new web/UI templates so a flavor swap re-resolves intent;
ports with literal-hue expectations (zed, discord, obsidian) read `colors` directly.

### Web-facing ports

Four targets feed the pivoshenko.* frontend stack. Use the **token** pair for new work:

- `tokens/` → `dist/tokens/<flavor>.css` — role-based custom properties (`--bg-canvas`,
  `--fg-default`, `--accent-primary`) scoped to `[data-flavor="<flavor>"]`, values as space-separated
  `R G B` triples (no `rgb()` wrapper) for Tailwind `<alpha-value>`. Runtime switch via
  `document.documentElement.dataset.flavor`.
- `tailwind-tokens/` → `dist/tailwind-tokens/<flavor>.js` — flavor-agnostic Tailwind preset
  consuming those vars; the three outputs are byte-identical, any one works.
- `tailwind/` → `dist/tailwind/<flavor>.js` — **legacy** preset with raw `colors.<flavor>.<token>`
  (`bg-morok-base`). Still vendored by `pivoshenko.ui/tailwind-preset`.
- `css-vars/` → `dist/css-vars/<flavor>.css` — **legacy** `:root` props named `--<flavor>-<token>`.

`preview/` → `dist/preview/<flavor>.html` is a self-contained page for eyeballing a flavor.

### Userstyles

`themes/userstyles/styles/<site>/style.user.less` — 133 Less userstyles, each with a `==UserStyle==`
metadata header and one `@import` of a hosted `lib.less` gist providing `#lib.palette()` /
`#morok()` mixins. `scripts/bundle.py` parses the headers (including `@var` lines — select options are
`"value:Label*"`, `*` marks the default), computes a SHA-1 `originalDigest`, and emits a Stylus
import JSON.

**Style sources are single-copy, never duplicated per flavor.** The only per-flavor difference is the
lib import URL, swapped at bundle time via `--rewrite-import OLD NEW`:

| flavor | gist | local mirror (gitignored) |
| --- | --- | --- |
| morok | `a4b48bfdc60be6a6a35ea5f3da732be1` / `lib.less` | `themes/userstyles/lib/lib.less` |
| popil | `ee8090a682bb964031d51705d9ffd697` / `popil.less` | `themes/userstyles/lib/popil.less` |
| vatra | `4966a9fda130dbd531f9884c11ae156b` / `vatra.less` | `themes/userstyles/lib/vatra.less` |

`themes/userstyles/lib/` is **gitignored** — hand-maintained local mirrors of the gists, not the
source of truth; a fresh clone won't have them. The committed artifact is `themes/dist/stylus/*.json`,
which references the gists by raw URL pinned to a gist commit SHA. Those pinned URLs live as justfile
variables `morok_lib_url` / `popil_lib_url` / `vatra_lib_url` — **editing a lib means re-pushing its
gist and bumping the matching justfile var** to the new SHA-bearing raw URL.

### Site

`site/` is a Next.js 16 App Router app (React 19, Tailwind 3, Biome, pnpm), reading `../themes/` at
build time via `site/lib/theme-data.ts` (`getPalette`, `getPorts`, port metadata like
`readmeAnchors` / `portSwatches`). Nearly all chrome is delegated to **`pivoshenko.ui`** (pinned
GitHub dependency): `layout.tsx` renders `<SiteLayout brand="pivoshenko.theme">`, and
`next.config.ts`, `postcss.config.mjs`, `biome.json`, `app/globals.css` are one-line re-exports of
shared subpaths; `tailwind.config.ts` wraps the `pivoshenko.ui/tailwind-preset/site` preset.

Two independent React contexts in `site/lib/`:

- `flavor-context.tsx` — which **content** palette the wall, table, examples, and terminal mock
  render. Site chrome is fixed on the pivoshenko.ui look and never follows this toggle; there is no
  light mode and no `next-themes`.
- `accent-context.tsx` — the pin + copy-hex interaction on the palette wall.

`components/palette-wall.tsx` labels swatches with an absolute light/dark pair from
`lib/contrast.ts` — the one justified exception to role tokens. `components/examples.tsx`
pre-renders Shiki HTML per flavor on the server (`lib/shiki-theme.ts`) and hands all three sets to
`examples-client.tsx`.

## Conventions

- Adding a flavor: drop `themes/palettes/<name>.json` (copy one, change `name`, the bg ramp, and
  `roles.accent`), host a lib gist, add a `render-<name>` recipe with its `--rewrite-import`, and add
  it to the `render` dependency list. No new templates.
- Adding a port: create `themes/templates/<tool>/theme.<ext>.jinja`, run `just render`, document
  install steps in the README, optionally register `<tool>` in `site/lib/theme-data.ts`
  (`readmeAnchors`, `portSwatches`) and `site/components/ports-grid.tsx`.
- `themes/dist/` is committed — re-run `just render` and commit the diff after any palette or
  template change; CI will not do it.
- Python module docstrings in `scripts/` open with `Module that contains ...`.
- Code comments never end with a period.
