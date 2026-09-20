# CLAUDE.md

Guidance for Claude Code when working in this repository.

`pivoshenko.theme` renders three dark flavors (`morok`, `popil`, `vatra`) from JSON palettes into per-tool
ports, plus Stylus userstyles and a Next.js showcase site in `site/`. No runtime library - it is a code
generator plus its generated output. Python + `uv` for `scripts/`, `pnpm` for `site/`, `just` for both;
`README.md` covers the flavors and every port, `CONTRIBUTING.md` the `just` table, CI, and commit rules.

## Landmines

- **`themes/dist/` is committed and nothing in CI checks it for drift.** Regenerate and commit it in the
  same change as any palette or template edit, or stale output ships unnoticed
- **there are no tests.** `just test` succeeds trivially if the `.no-tests` sentinel is present and fails
  loudly if it is not, so do not delete it unless you are adding a real test command in the same change
- **after `just clean`, run `just render-themes` before `just build-site`.** `just build` renders themes
  *after* building the site, but the site reads `themes/dist` from disk, so a cleaned tree fails the build
- **`=#{{` is rewritten to `={{` before rendering** (see below), so a literal `#` immediately before an
  expression is silently swallowed
- **a color slot added to one palette must be added to all three.** The Jinja environment uses
  `StrictUndefined`, so the other two flavors fail the render hard instead of emitting an empty string
- **`themes/userstyles/lib/` is gitignored and has no generator recipe.** The authoritative copies are the
  hosted gists pinned at the top of the `justfile`; the local files exist only for offline Less resolution.
  Palette edits do not propagate to them - update the gists by hand or the userstyles keep the old colors

## Verifying a change

There are no tests, so the render is the gate. After any palette or template edit run `just render-themes`,
then `git status themes/dist`: the changed files should be exactly the ones you intended. Unexpected churn
means you touched something shared by other ports; no churn at all means your edit never reached the
renderer. Run `just check` before a PR - Python linting goes through `uvx`, not the project venv, so it
works without `just install-py`.

## The render pipeline

```
themes/palettes/<flavor>.json  ->  scripts/render.py  ->  themes/dist/<tool>/<flavor>.<ext>
                                   (themes/templates/<tool>/*.jinja)
```

`scripts/render.py` loads one palette, builds a Jinja context, and renders **every** `*.jinja` under
`themes/templates/` recursively. One invocation = one flavor = a full sweep of all templates.

Template context (`_build_context`): every palette color as a bare name with a `.hex` attribute
(`{{ mauve.hex }}`); `role.bg.*` / `role.fg.*` / `role.border.*` / `role.accent.*` semantic aliases resolved
from the palette's `roles` block (`{{ role.bg.canvas.hex }}`); `{{ name }}` and `flavor.dark` /
`flavor.light`; the globals `iif(cond=, t=, f=)`, `| mix(color=, amount=)`, `| get(key="hex")`, `| rgb`.

`_normalize_template` rewrites every template first, for compatibility with the Catppuccin Whiskers
dialect the templates were written in: `{{ if(` becomes `{{ iif(`, `=#{{` becomes `={{`. The swallowed `#`
is deliberate - `.hex` carries its own, so ghostty's `palette = 1=#{{ red.hex }}` emits `1=#df7c7b`.

`_render_target_from_template` maps template filename to output path. `templates/<tool>/theme.<ext>.jinja`
-> `dist/<tool>/<flavor>.<ext>` is the normal case; other filenames land differently (multi-file ports like
obsidian and zen, fixed-name artifacts like telegram), so read it before naming a template anything else.
`templates/preview/` is an ordinary port: it renders to `dist/preview/<flavor>.html` and shows up in the
site's port grid like any other.

## Adding a port

1. add `themes/templates/<tool>/theme.<ext>.jinja`
2. `just render-themes`
3. commit the generated `themes/dist/<tool>/{morok,popil,vatra}.<ext>` alongside the template
4. add an install section to `README.md` under `## Ports`
5. add `portGroups`, `portDescriptions`, `readmeAnchors` and `portSwatches` entries in
   `site/lib/theme-data.ts`, and an icon in `site/components/port-entry.tsx` - the site finds ports by
   listing `themes/dist/`, so a new one appears on `/ports` regardless, but it lands in the `cli` group
   with no description, no install link and a generic icon until those are filled in

## Userstyles

`scripts/bundle.py` packs `themes/userstyles/styles/*/style.user.less` into a single Stylus import JSON at
`themes/dist/stylus/<flavor>.json`. Style sources are single-copy: every `style.user.less` `@import`s the
*morok* lib gist, and per-flavor output comes from `--rewrite-import OLD_URL NEW_URL`, which swaps that
import for the popil or vatra gist.

## The site

`site/` leans heavily on `pivoshenko.ui`, pinned as a GitHub dependency in `site/package.json`; nearly every
config file in `site/` is a one-line re-export of something that package supplies, so changing the shared
look usually means bumping that pin, not editing files here. `lib/theme-data.ts` reads
`../themes/palettes/*.json` and lists `../themes/dist/` **from the filesystem at build time** via `node:fs`,
which is why the site cannot build against a cleaned `themes/dist` and has to stay in the themes' checkout.

Three routes: `/` is the landing (hero band, the three flavors as cards, links onward), `/ports` is the
port catalog, and `/palette` carries the flavor toggle, the color grid and the code samples. The catalog
groups ports by `PORT_GROUPS` in `lib/theme-data.ts`, and `getPorts()` returns them already in that order
because `Catalog` buckets by first appearance. The grouping and the per-port copy are hand-kept, not
derived from the template tree.

## Palettes

A palette is `name`, `flavor`, a flat `colors` map, and a `roles` map from semantic names to slot names.
The site classifies slots by name in `colorGroup()` (`site/lib/theme-data.ts`), so a new slot name has to
fall into the `text` / `surface` prefix rules there or it is treated as an accent.

`AGENTS.md` is a symlink to this file. Edit `CLAUDE.md`, never `AGENTS.md`.
