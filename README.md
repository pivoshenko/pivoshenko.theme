# pivoshenko.theme

<p align="left">
  <a href="https://stand-with-ukraine.pp.ua/">
    <img alt="StandWithUkraine" src="https://img.shields.io/badge/Support-Ukraine-FFC93C?style=flat-square&labelColor=07689F">
  </a>
</p>

## Overview

Themes focused on minimalism, simplicity and cross-tool consistency, shipped in three flavors:

- **`Morok`** — pitch black, neutral greys on a true-black floor, cool Catppuccin-frappe-style accents.
- **`Popil`** — warm ash. Near-neutral warm-grey base with neutral warm-grey subtext and muted terracotta accents. The "house" flavor for brand surfaces.
- **`Vatra`** — Carpathian hearth fire. Same warm `#1f1f1e` base as popil but with golden-tan subtext and gruvbox-material-warm accents (orange primary). Punchier, more saturated take on the warm flavor.

All three flavors share the same 14 named color slots and every port template — only the *values* in those slots diverge. Pick `morok` for maximum contrast, `popil` for restrained warm minimalism, `vatra` for the gruvbox-coded sibling.

> Preview the palette, compare both flavors, and browse the ports live at **[theme.pivoshenko.dev](https://theme.pivoshenko.dev/)**.

**About the names**

*Morok* (pronounced [mo-rok]) is a Ukrainian word that means "darkness" or "gloom". It is often used to describe a state of melancholy, sadness, or despair, or a dark and gloomy atmosphere.

*Popil* (pronounced [po-pil]) is a Ukrainian word that means "ash". It evokes the warm grey embers smouldering after a fire has burned down — a faint, lingering heat in the dark. It carries a sense of quiet aftermath: of what remains, still warm, once the flame is gone — mirroring this flavor's warm off-black ramp.

*Vatra* (pronounced [va-tra]) is a Ukrainian word that means "Carpathian hearth fire" or "bonfire" — the open flame around which highland shepherds gather. Where popil is the ash, vatra is the fire still burning: warmer, more saturated, alive with orange and ember-yellow. The two flavors are the same scene at different moments.

## Usage

Repository contains ports for various terminal applications and userstyles for popular websites. All ports are generated from the source palettes (`themes/palettes/morok.json`, `themes/palettes/popil.json`, `themes/palettes/vatra.json`) against shared templates, ensuring a cohesive look across different tools and platforms. Every port below ships as `themes/dist/<tool>/morok.<ext>`, `themes/dist/<tool>/popil.<ext>`, and `themes/dist/<tool>/vatra.<ext>`.

Install steps below use `<flavor>` as a placeholder — substitute `morok`, `popil`, or `vatra` in **both** the source filename and any in-tool identifier the step sets (`theme = "<flavor>"`, `palette = "<flavor>"`, `--theme="<flavor>"`, `skin: <flavor>`, etc.). Telegram is the one exception: it ships per-flavor deep links.

See [pivoshenko.dotfiles](https://github.com/pivoshenko/pivoshenko.dotfiles) for a real-world setup consuming the theme across fish, starship, helix, ghostty, zed, k9s, bottom, lazygit, zellij, bat, spicetify, and stylus.

## Ports

#### Bat

1. Copy [`themes/dist/bat/<flavor>.tmTheme`](themes/dist/bat/) to `~/.config/bat/themes/`.
2. Run `bat cache --build`.
3. Set `--theme="<flavor>"` in `~/.config/bat/config`.

#### Bottom

1. Copy [`themes/dist/bottom/<flavor>.toml`](themes/dist/bottom/) to `~/.config/bottom/bottom.toml`.
2. Start `btm`.

#### Delta

1. Copy [`themes/dist/delta/<flavor>.gitconfig`](themes/dist/delta/) to `~/.config/delta/themes/<flavor>.gitconfig`.
2. Add `include = ~/.config/delta/themes/<flavor>.gitconfig` under `[include]` in `~/.gitconfig`.
3. Set `features = <flavor>` under `[delta]` in `~/.gitconfig`.

#### Discord

1. In your Discord client (Vesktop / BetterDiscord), open Themes settings and switch to the **Online Themes** tab.
2. Add the raw URL for the flavor you want, prefixed with `@dark`:

   ```
   @dark https://raw.githubusercontent.com/pivoshenko/pivoshenko.theme/refs/heads/main/themes/dist/discord/<flavor>.theme.css
   ```

   Substitute `<flavor>` with `morok`, `popil`, or `vatra`.
3. Enable the theme in the client.

#### Fastfetch

1. Copy [`themes/dist/fastfetch/<flavor>.jsonc`](themes/dist/fastfetch/) to `~/.config/fastfetch/config.jsonc` (the dist file is a full `config.jsonc`).
2. Run `fastfetch`.

#### Fish

1. Copy [`themes/dist/fish/<flavor>.theme`](themes/dist/fish/) to `~/.config/fish/themes/`.
2. Run `fish_config theme save <flavor>`.

#### Fzf

1. Copy [`themes/dist/fzf/<flavor>.fish`](themes/dist/fzf/) to `~/.config/fish/conf.d/`.
2. Start a new Fish session, or source the file manually.
3. Set `FZF_DEFAULT_OPTS="$FZF_<FLAVOR>"` (uppercase: `$FZF_MOROK`, `$FZF_POPIL`, `$FZF_VATRA`) or append it to your existing `FZF_DEFAULT_OPTS`.

#### Ghostty

1. Copy [`themes/dist/ghostty/<flavor>.conf`](themes/dist/ghostty/) to `~/.config/ghostty/themes/<flavor>`.
2. Set `theme = <flavor>` in `~/.config/ghostty/config`.

#### Helix

1. Copy [`themes/dist/helix/<flavor>.toml`](themes/dist/helix/) to `~/.config/helix/themes/<flavor>.toml`.
2. Set `theme = "<flavor>"` in `~/.config/helix/config.toml`.

#### K9s

1. Copy [`themes/dist/k9s/<flavor>.yaml`](themes/dist/k9s/) to `~/.config/k9s/skins/<flavor>.yaml`.
2. Set `skin: <flavor>` in `~/.config/k9s/config.yaml`.

#### Lazygit

1. Copy [`themes/dist/lazygit/<flavor>.yml`](themes/dist/lazygit/) to `~/.config/lazygit/config.yml`.
2. Or merge only the `theme:` section into your existing config.

#### Obsidian

1. Copy [`themes/dist/obsidian/<flavor>.css`](themes/dist/obsidian/) to your Obsidian theme folder and rename it to `theme.css`.
2. Optionally copy [`themes/dist/obsidian/<flavor>.manifest.json`](themes/dist/obsidian/) and rename it to `manifest.json`.
3. Enable the theme in Obsidian Appearance settings.

#### Spicetify

1. Copy [`themes/dist/spicetify/<flavor>.color.ini`](themes/dist/spicetify/) to `~/.config/spicetify/Themes/<flavor>/color.ini`.
2. Set `current_theme = <flavor>` in your Spicetify config.
3. Run `spicetify apply`.

#### Starship

1. Copy the palette from [`themes/dist/starship/<flavor>.toml`](themes/dist/starship/) to your [Starship configuration file](https://starship.rs/config/).
2. Set `palette = "<flavor>"`, preferably near the top of your config.
3. Save and reload your prompt.

#### Telegram

1. Open the theme deep link in Telegram: [`pivoshenko_theme_morok`](https://t.me/addtheme/pivoshenko_theme_morok) or [`pivoshenko_theme_popil`](https://t.me/addtheme/pivoshenko_theme_popil).
2. Tap "Apply Theme".

Platform-specific source files for all three flavors live in [`themes/dist/telegram/`](themes/dist/telegram/) as `<flavor>-desktop`, `<flavor>-ios`, and `<flavor>-macos` — use these directly if no deep link is hosted for your flavor.

#### VSCode

1. Install a Catppuccin VSCode theme (for example `Catppuccin Mocha`).
2. Open the generated override snippet [`themes/dist/vscode/<flavor>.json`](themes/dist/vscode/).
3. Merge its `catppuccin.colorOverrides` block into your VSCode `settings.json`.

#### Zed

1. Copy [`themes/dist/zed/<flavor>.json`](themes/dist/zed/) to a stable location, for example `~/.config/zed/themes/<flavor>.json`.
2. Open Zed and choose the theme from `Theme Selector` (or set it in your Zed settings).

#### Zen

1. Copy [`themes/dist/zen/<flavor>.userChrome.css`](themes/dist/zen/) and [`themes/dist/zen/<flavor>.userContent.css`](themes/dist/zen/) into your Zen profile `chrome/` directory as `userChrome.css` and `userContent.css`.
2. Restart Zen Browser.

#### Zellij

1. Copy the theme block from [`themes/dist/zellij/<flavor>.kdl`](themes/dist/zellij/) into your Zellij config, or place it in a sourced theme file.
2. Set the active theme to `<flavor>`.

#### Tailwind

For Next.js / Tailwind 3 sites in the pivoshenko.* ecosystem.

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import flavor from './path/to/themes/dist/tailwind/<flavor>.js' // morok | popil | vatra

export default {
  presets: [flavor],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
} satisfies Config
```

Exposes `colors.<flavor>.<token>` (e.g. `bg-morok-base`, `text-popil-peach`) plus a JetBrains Mono font stack and `darkMode: 'class'`. Consumed in production via [pivoshenko.ui](https://github.com/pivoshenko/pivoshenko.ui) under the `pivoshenko.ui/tailwind-preset` subpath (vendored on release).

#### CSS Variables

For plain-CSS surfaces and design-system docs.

```css
@import url('/path/to/themes/dist/css-vars/<flavor>.css'); /* morok | popil | vatra */

.button { background: var(--morok-blue); color: var(--morok-text); }
```

Every palette token becomes a `--<flavor>-<token>` custom property on `:root`.

#### Design tokens (semantic, switcher-ready)

For Next.js / shadcn / any frontend stack that needs a runtime flavor switcher. Tokens are flavor-agnostic semantic names (`--bg-canvas`, `--fg-default`, `--accent-primary`) scoped to `[data-flavor="<flavor>"]`. Values are space-separated `R G B` triples for `<alpha-value>` support.

```ts
// globals.css
@import url('/path/to/themes/dist/tokens/morok.css');
@import url('/path/to/themes/dist/tokens/popil.css');
@import url('/path/to/themes/dist/tokens/vatra.css');

// tailwind.config.ts — preset is flavor-agnostic, any flavor file works
import type { Config } from 'tailwindcss'
import preset from './path/to/themes/dist/tailwind-tokens/morok.js'

export default {
  presets: [preset],
  content: ['./app/**/*.{ts,tsx}'],
} satisfies Config
```

```tsx
<html data-flavor="morok"> {/* or "popil" / "vatra" */}
  <body className="bg-canvas text-fg-default">
    <button className="bg-accent-primary text-bg-canvas">Click</button>
  </body>
</html>
```

Flip flavor at runtime by setting `document.documentElement.dataset.flavor`.

## Userstyles

1. Install the [Stylus browser extension](https://add0n.com/stylus.html).
2. In Stylus, open the extension popup, go to `Manage`, then `Import`.
3. Select [`themes/dist/stylus/<flavor>.json`](themes/dist/stylus/) — `morok`, `popil`, or `vatra`.

Default accent color is **blue** for `morok` and **peach/terracotta** for `popil` / `vatra`.

Browse the available styles under [`themes/userstyles/styles/`](themes/userstyles/styles/).

## Thanks

Palette structure and token naming inspired by [Catppuccin](https://github.com/catppuccin/catppuccin).
