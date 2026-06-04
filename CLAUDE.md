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
just render-vatra   # warm ash (gruvbox-material)

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

# Vulnerability scan (uv audit + pnpm audit on the site)
just audit
```

Top-level aggregates fan out to both halves: `just lint` = `lint-py` + `lint-next`, `just check` = `check-py` + `check-next`, `just format` = `format-py` + `format-next`, `just audit` = `audit-py` + `audit-next`, `just update` = `update-py` + `update-next`. `just build` runs `render`.

All Python tasks use `uv run`. The render step runs both `scripts/render.py` and `scripts/bundle.py`.

## Architecture

The repository hosts a single brand theme rendered in **three flavors** from three palette JSON sources against **one shared set of templates**, all under `themes/`. Flavors differ in their background ramp, foreground neutrals, and accents:

- `morok` — pitch black, near-white text on `#000000`, cool Catppuccin-frappe-style accents (`accent.primary = blue`).
- `popil` — warm-grey base `#1f1f1e`, neutral warm-grey subtext, **muted terracotta accents** (`accent.primary = #d97757`). The "house" flavor for brand surfaces.
- `vatra` — same warm `#1f1f1e` base, golden-tan subtext, **gruvbox-material-warm accents** (`accent.primary = orange #ec7f3e`). Carpathian hearth fire — the warmer, punchier sibling of popil.

All three palettes share the same 14 named color slots (`rosewater`/`flamingo`/.../`lavender`) so port templates stay flavor-agnostic; the *values* in those slots differ. Shared Python tooling in `scripts/` renders any palette via `--palette`.

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

`themes/palettes/morok.json`, `themes/palettes/popil.json`, and `themes/palettes/vatra.json` each define all colors with `#rrggbb` hex values (including the `#` prefix). To change colors, edit the relevant palette. Each palette has two top-level blocks:

- **`colors`** — the 14 raw named slots (`rosewater`/`flamingo`/`pink`/`mauve`/`red`/`maroon`/`peach`/`yellow`/`green`/`teal`/`sky`/`sapphire`/`blue`/`lavender`) + `text`/`subtext*` + `overlay*` + `surface*`/`base`/`mantle`/`crust`. Same keys in both flavors; values diverge per flavor. Port templates that target apps with literal-hue slot expectations (zed, discord, obsidian) read these directly.
- **`roles`** — semantic layer mapping role keys to color names: `bg.{canvas,surface,raised,sunken,overlay}`, `fg.{default,muted,subtle,faint}`, `border.{subtle,default,strong}`, `accent.{primary,secondary,success,warning,danger,info}`. Each value is a `colors` key string (e.g. `"accent.primary": "blue"` for morok, `"peach"` for popil). Roles are how flavor identity gets expressed: same role, different color name per flavor. Web ports + frontend frameworks should consume *only* roles so a flavor swap re-resolves color intent automatically.

`morok` crust is true `#000000` with near-white text and `accent.primary = blue`; `popil` anchors `base` to warm-grey `#1f1f1e` (near-neutral, faintly warm), neutral warm-grey subtext, and `accent.primary = peach` (muted terracotta `#d97757`); `vatra` shares popil's bg ramp but layers golden-tan subtext and `accent.primary = peach` (gruvbox-material orange `#ec7f3e`) for a warmer, more saturated take.

### Templates

`themes/templates/<tool>/theme.<ext>.jinja` — Jinja2 templates that reference palette colors as `{{ color.hex }}` (full `#rrggbb` string), roles as `{{ role.<group>.<key>.hex }}` (e.g. `{{ role.accent.primary.hex }}`, `{{ role.bg.canvas.hex }}`), and the flavor name as `{{ name }}`. Available filters: `mix(color=..., amount=0.5)`, `get(key='hex')`, `rgb`. The `iif(cond, t, f)` global is available for conditionals. One template renders both flavors: `morok` → `themes/dist/<tool>/morok.<ext>`, `popil` → `themes/dist/<tool>/popil.<ext>`. Use `{{ name }}` (never a literal `morok`) for any in-file theme identifier (telegram `shortname`, bat scope, obsidian style-settings `id`s) so the shared template stays flavor-correct. Prefer `role` over raw color names in new web/UI templates — it keeps flavor identity intact when colors are retuned.

**Multi-file ports** (a tool with several fixed-name artifacts, e.g. `telegram` → `macos`/`desktop`/`ios`): use the verbatim form `themes/templates/<tool>/<name>.jinja` → `themes/dist/<tool>/<flavor>-<name>` (e.g. `themes/dist/telegram/morok-macos`, no extension). Triggered when the template basename has no dot and isn't `theme`. The `<flavor>-` prefix prevents the two palettes colliding in the shared dir. Tokenize hex literals to `{{ token.hex }}`; keep deliberately port-specific colors (e.g. telegram outgoing-bubble tints) and true-black opacity scrims (`#000000CC`) as literals.

### Web ports

Four ports target the brand's web stack. Use **tokens** + **tailwind-tokens** for any new frontend work; `tailwind` + `css-vars` remain for legacy raw-color consumers.

- `themes/templates/tokens/theme.css.jinja` → `themes/dist/tokens/morok.css` (+ `popil.css`) — semantic role-based CSS variables scoped to `[data-flavor="<flavor>"]`. Values are space-separated `R G B` triples (no `rgb()` wrapper) so consumers can use `rgb(var(--accent-primary) / <alpha-value>)` in Tailwind / shadcn configs. Token names are flavor-agnostic (`--bg-canvas`, `--fg-default`, `--accent-primary`); switching flavor = setting `data-flavor` on the root element.
- `themes/templates/tailwind-tokens/theme.js.jinja` → `themes/dist/tailwind-tokens/morok.js` (+ `popil.js`, identical content) — flavor-agnostic Tailwind preset (CommonJS) consuming the tokens CSS vars. Exposes `colors.bg.{canvas,surface,...}`, `colors.fg.{default,muted,...}`, `colors.border.{subtle,default,strong}`, `colors.accent.{primary,secondary,success,warning,danger,info}` plus a JetBrains Mono font stack. Utilities become `bg-canvas`, `text-fg-muted`, `bg-accent-primary/50`, etc. — independent of flavor.
- `themes/templates/tailwind/theme.js.jinja` → `themes/dist/tailwind/morok.js` (+ `popil.js`) — *legacy* Tailwind preset exposing `colors.<flavor>.<token>` (raw color names). Still consumed by `pivoshenko.ui/tailwind-preset` (vendored on release; sites import via `pivoshenko.ui/tailwind-preset` subpath). Prefer `tailwind-tokens` for new sites.
- `themes/templates/css-vars/theme.css.jinja` → `themes/dist/css-vars/morok.css` (+ `popil.css`) — *legacy* `:root` custom properties named `--<flavor>-<token>` (raw color names). Consumed by the `pivoshenko-brand` skill's HTML reference and any plain-CSS surfaces. Prefer `tokens` for new work.
- `themes/templates/preview/theme.html.jinja` → `themes/dist/preview/morok.html` (+ `popil.html`) — self-contained HTML preview showing role swatches, UI panels (buttons/badges/cards), code sample, and raw palette grid. Open in a browser to eyeball a flavor.

### Userstyles

`themes/userstyles/styles/<site>/style.user.less` — Less-based userstyles for browser injection via Stylus. Each file has a `==UserStyle==` metadata header. They import the shared palette via a hosted gist URL and use `#lib.palette()` / `#lib.defaults()` mixins. `scripts/bundle.py` collects all `style.user.less` files and produces a Stylus import bundle.

All three flavors ship a bundle from the **same** single-copy style sources — they're never duplicated per flavor. The only per-flavor difference is the lib `@import` URL: each flavor hosts its own `lib.less` gist (differing bg ramp, foreground neutrals, and accents — but keeping the `@morok` map name + `#lib` mixins so style files need no other change). The lib sources live at `themes/userstyles/lib/lib.less` (morok), `themes/userstyles/lib/popil.less` (popil), and `themes/userstyles/lib/vatra.less` (vatra) — all hand-maintained mirrors, **gitignored** (`lib/`): they're the editing source for the hosted gists, not committed. A fresh clone won't have them; the committed artifact is the bundle (`themes/dist/stylus/*.json`), which references the gists by URL. Editing a lib means re-hosting its gist. `bundle.py`'s `--rewrite-import OLD NEW` swaps the morok gist URL for the flavor's own at bundle time:

- `morok` → `themes/dist/stylus/morok.json` (stock gist URL, no rewrite)
- `popil` → `themes/dist/stylus/popil.json` (rewrites to the popil lib gist via `--rewrite-import`)
- `vatra` → `themes/dist/stylus/vatra.json` (rewrites to the vatra lib gist via `--rewrite-import`)

The gist URLs are justfile vars (`morok_lib_url`, `popil_lib_url`, `vatra_lib_url`). The hosted gists (owner `pivoshenko`):

- `morok` → gist `a4b48bfdc60be6a6a35ea5f3da732be1`, file `lib.less` (source: `themes/userstyles/lib/lib.less`)
- `popil` → gist `ee8090a682bb964031d51705d9ffd697`, file `popil.less` (source: `themes/userstyles/lib/popil.less`)
- `vatra` → gist `4966a9fda130dbd531f9884c11ae156b`, file `vatra.less` (source: `themes/userstyles/lib/vatra.less`)

**Each `*_lib_url` must point at a hosted raw URL of its lib file** before `just render-<flavor>` produces a usable bundle. When a lib changes, **re-host that gist** (push the edited local `lib/*.less` to the gist above) and bump the matching justfile var to the new raw URL (the raw URL embeds a commit SHA that changes on every gist edit). The pinned SHA in the URL means the bundle keeps resolving the exact ramp it was built against until you bump it.

### Site

`site/` — Next.js app for visual preview of palette + ports. Managed separately with `pnpm` inside that directory. Renamed from `showcase/` to align with the `sources/` repo convention where every web preview lives in `site/`.

Shell is composed via `<SiteLayout brand="pivoshenko.theme">` from `pivoshenko.ui/next/site-layout`, which owns `<html>`, `<body>`, JetBrains-Mono font loading, `<PageShell>` (`Nav` + `Footer` + `ScrollToTop`), and `<Analytics />`. Metadata comes from `siteMetadata(...)`, viewport from `siteViewport`. The site runs on the single `popil` chrome (no light mode, no `next-themes`); the morok/popil/vatra **content** flavor switcher (`FlavorToggle` → `FlavorProvider`) only drives what the palette grid, examples, and ports preview render — never the chrome. `tailwind.config.ts` / `next.config.ts` / `postcss.config.mjs` / `app/icon.tsx` / `app/opengraph-image.tsx` are all thin wrappers over the shared subpaths in `pivoshenko.ui`. See the shared UI invariant in `sources/CLAUDE.md`.

## Key conventions

- Hex values in `themes/palettes/*.json` include the `#` prefix — templates do **not** add their own `#`.
- `render.py`'s `_normalize_template` replaces `=#{{` → `={{` to handle a common Tera-style mistake; avoid writing templates with `#{{ color.hex }}`.
- Userstyle `@var` options use `"value:Label*"` syntax where `*` marks the default.
- `render.py` derives templates + output dirs from the palette path: `palette.parent.parent / "templates"` and `/ "dist"`. With palettes at `themes/palettes/*.json`, both resolve to `themes/`, so all flavors share `themes/templates/` and write to `themes/dist/`. Pass `--templates-dir` / `--output-dir` to override. Consumers vendor `themes/dist/tailwind/morok.js` into their own repos on tag bumps.
- Adding a new flavor: drop `themes/palettes/<name>.json` (start from a copy, change `name` + the background ramp), add a `just render-<name>` recipe, and extend `render` to depend on it. Templates are shared — no new template dir.
- All files in `themes/dist/` are committed to git so downstream consumers don't need to run Python or `uv`.
- `just lint-py` runs `ruff check` + `ty check` only (no commit-message linting configured).
