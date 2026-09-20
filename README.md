# pivoshenko.theme

<p align="left">
  <a href="https://stand-with-ukraine.pp.ua/">
    <img alt="StandWithUkraine" src="https://img.shields.io/badge/Support-Ukraine-FFC93C?style=flat-square&labelColor=07689F">
  </a>
</p>

## Overview

Dark themes focused on minimalism, simplicity and cross-tool consistency, shipped in three flavors:

- **`Morok`** [mo-rok] - Ukrainian for "darkness" or "gloom". The starkest of the three: deepest floor,
  coolest tone, maximum contrast
- **`Popil`** [po-pil] - Ukrainian for "ash", the embers still smouldering after a fire has burned down.
  Warm, muted and restrained, and the house flavor for brand surfaces
- **`Vatra`** [va-tra] - Ukrainian for "Carpathian hearth fire", the open flame highland shepherds gather
  around. Popil's scene a moment earlier, with the fire still burning: warmer, punchier, more saturated

All three share the same 14 named slots and every port template - only the values in those slots differ.

> Preview the palette, compare the flavors, and browse the ports live at **[theme.pivoshenko.dev](https://theme.pivoshenko.dev/)**.

## Usage

Every port is generated from the source palettes in [`themes/palettes/`](themes/palettes/) against shared
templates, which keeps the look consistent across tools and platforms. One file per tool per flavor:

```
themes/dist/<tool>/<flavor>.<ext>    # <flavor> is morok, popil or vatra
```

Install steps below use `<flavor>` as a placeholder. Substitute it in **both** the source filename and any
in-tool identifier the step sets (`theme = "<flavor>"`, `palette = "<flavor>"`, `--theme="<flavor>"`,
`skin: <flavor>`). Telegram is the one exception: it ships per-flavor deep links.

See [pivoshenko.dotfiles](https://github.com/pivoshenko/pivoshenko.dotfiles) for a real-world setup
consuming the theme across fish, starship, helix, ghostty, zed, k9s, bottom, lazygit, zellij, bat,
spicetify, and stylus.

## Ports

#### Bat

<details>
<summary>Install</summary>

1. Copy [`themes/dist/bat/<flavor>.tmTheme`](themes/dist/bat/) to `~/.config/bat/themes/`
2. Run `bat cache --build`
3. Set `--theme="<flavor>"` in `~/.config/bat/config`

</details>

#### Bottom

<details>
<summary>Install</summary>

1. Copy [`themes/dist/bottom/<flavor>.toml`](themes/dist/bottom/) to `~/.config/bottom/bottom.toml`
2. Start `btm`

</details>

#### Delta

<details>
<summary>Install</summary>

1. Copy [`themes/dist/delta/<flavor>.gitconfig`](themes/dist/delta/) to `~/.config/delta/themes/<flavor>.gitconfig`
2. Add `include = ~/.config/delta/themes/<flavor>.gitconfig` under `[include]` in `~/.gitconfig`
3. Set `features = <flavor>` under `[delta]` in `~/.gitconfig`

</details>

#### Discord

<details>
<summary>Install</summary>

1. In your Discord client (Vesktop / BetterDiscord), open Themes settings and switch to the **Online Themes** tab
2. Add the raw URL for the flavor you want, prefixed with `@dark`:

   ```
   @dark https://raw.githubusercontent.com/pivoshenko/pivoshenko.theme/refs/heads/main/themes/dist/discord/<flavor>.theme.css
   ```

   Substitute `<flavor>` with `morok`, `popil`, or `vatra`
3. Enable the theme in the client

</details>

#### Fastfetch

<details>
<summary>Install</summary>

1. Copy [`themes/dist/fastfetch/<flavor>.jsonc`](themes/dist/fastfetch/) to `~/.config/fastfetch/config.jsonc` (the dist file is a full `config.jsonc`)
2. Run `fastfetch`

</details>

#### Fish

<details>
<summary>Install</summary>

1. Copy [`themes/dist/fish/<flavor>.theme`](themes/dist/fish/) to `~/.config/fish/themes/`
2. Run `fish_config theme save <flavor>`

</details>

#### Fzf

<details>
<summary>Install</summary>

1. Copy [`themes/dist/fzf/<flavor>.fish`](themes/dist/fzf/) to `~/.config/fish/conf.d/`
2. Start a new Fish session, or source the file manually
3. Set `FZF_DEFAULT_OPTS="$FZF_<FLAVOR>"` (uppercase: `$FZF_MOROK`, `$FZF_POPIL`, `$FZF_VATRA`) or append it to your existing `FZF_DEFAULT_OPTS`

</details>

#### Ghostty

<details>
<summary>Install</summary>

1. Copy [`themes/dist/ghostty/<flavor>.conf`](themes/dist/ghostty/) to `~/.config/ghostty/themes/<flavor>`
2. Set `theme = <flavor>` in `~/.config/ghostty/config`

</details>

#### Helix

<details>
<summary>Install</summary>

1. Copy [`themes/dist/helix/<flavor>.toml`](themes/dist/helix/) to `~/.config/helix/themes/<flavor>.toml`
2. Set `theme = "<flavor>"` in `~/.config/helix/config.toml`

</details>

#### Herdr

<details>
<summary>Install</summary>

1. Copy [`themes/dist/herdr/<flavor>.toml`](themes/dist/herdr/) to `~/.config/herdr/config.toml`, or merge its `[theme]` and `[theme.custom]` blocks into an existing config
2. Run `herdr server reload-config` to apply it to a running session

</details>

#### K9s

<details>
<summary>Install</summary>

1. Copy [`themes/dist/k9s/<flavor>.yaml`](themes/dist/k9s/) to `~/.config/k9s/skins/<flavor>.yaml`
2. Set `skin: <flavor>` in `~/.config/k9s/config.yaml`

</details>

#### Lazygit

<details>
<summary>Install</summary>

1. Copy [`themes/dist/lazygit/<flavor>.yml`](themes/dist/lazygit/) to `~/.config/lazygit/config.yml`
2. Or merge only the `theme:` section into your existing config

</details>

#### LS Colors

<details>
<summary>Install</summary>

1. Copy [`themes/dist/ls-colors/<flavor>.fish`](themes/dist/ls-colors/) to `~/.config/fish/themes/`
2. Source it from `config.fish`: `source ~/.config/fish/themes/<flavor>.fish`
3. Colors reach `ls`, `eza`, and anything else reading `LS_COLORS` - fzf previews and shell completion
   lists included

The file sets `LS_COLORS` (file types and extensions) and `EZA_COLORS` (eza's permission, size, owner,
date and git columns, prefixed with `reset` so eza's built-in palette does not leak through). For a
non-Fish shell, lift the two quoted strings into your own `export`.

</details>

#### Obsidian

<details>
<summary>Install</summary>

1. Copy [`themes/dist/obsidian/<flavor>.css`](themes/dist/obsidian/) to your Obsidian theme folder and rename it to `theme.css`
2. Optionally copy [`themes/dist/obsidian/<flavor>.manifest.json`](themes/dist/obsidian/) and rename it to `manifest.json`
3. Enable the theme in Obsidian Appearance settings

</details>

#### Spicetify

<details>
<summary>Install</summary>

1. Copy [`themes/dist/spicetify/<flavor>.color.ini`](themes/dist/spicetify/) to `~/.config/spicetify/Themes/<flavor>/color.ini`
2. Set `current_theme = <flavor>` in your Spicetify config
3. Run `spicetify apply`

</details>

#### Starship

<details>
<summary>Install</summary>

1. Copy the palette from [`themes/dist/starship/<flavor>.toml`](themes/dist/starship/) to your [Starship configuration file](https://starship.rs/config/)
2. Set `palette = "<flavor>"`, preferably near the top of your config
3. Save and reload your prompt

</details>

#### Telegram

<details>
<summary>Install</summary>

1. Open the theme deep link in Telegram: [`pivoshenko_theme_morok`](https://t.me/addtheme/pivoshenko_theme_morok) or [`pivoshenko_theme_popil`](https://t.me/addtheme/pivoshenko_theme_popil)
2. Tap "Apply Theme"

Platform-specific source files for all three flavors live in [`themes/dist/telegram/`](themes/dist/telegram/) as `<flavor>-desktop`, `<flavor>-ios`, and `<flavor>-macos`. Use these directly if no deep link is hosted for your flavor.

</details>

#### VSCode

<details>
<summary>Install</summary>

1. Install a Catppuccin VSCode theme (for example `Catppuccin Mocha`)
2. Open the generated override snippet [`themes/dist/vscode/<flavor>.json`](themes/dist/vscode/)
3. Merge its `catppuccin.colorOverrides` block into your VSCode `settings.json`

</details>

#### Zed

<details>
<summary>Install</summary>

1. Copy [`themes/dist/zed/<flavor>.json`](themes/dist/zed/) to a stable location, for example `~/.config/zed/themes/<flavor>.json`
2. Open Zed and choose the theme from `Theme Selector` (or set it in your Zed settings)

</details>

#### Zen

<details>
<summary>Install</summary>

1. Copy [`themes/dist/zen/<flavor>.userChrome.css`](themes/dist/zen/) and [`themes/dist/zen/<flavor>.userContent.css`](themes/dist/zen/) into your Zen profile `chrome/` directory as `userChrome.css` and `userContent.css`
2. Restart Zen Browser

</details>

#### Zellij

<details>
<summary>Install</summary>

1. Copy the theme block from [`themes/dist/zellij/<flavor>.kdl`](themes/dist/zellij/) into your Zellij config, or place it in a sourced theme file
2. Set the active theme to `<flavor>`

</details>

#### Tailwind

<details>
<summary>Usage</summary>

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

</details>

#### CSS Variables

<details>
<summary>Usage</summary>

For plain-CSS surfaces and design-system docs.

```css
@import url('/path/to/themes/dist/css-vars/<flavor>.css'); /* morok | popil | vatra */

.button { background: var(--morok-blue); color: var(--morok-text); }
```

Every palette token becomes a `--<flavor>-<token>` custom property on `:root`.

</details>

#### Design Tokens (Semantic, Switcher-Ready)

<details>
<summary>Usage</summary>

For Next.js / shadcn / any frontend stack that needs a runtime flavor switcher. Tokens are flavor-agnostic semantic names (`--bg-canvas`, `--fg-default`, `--accent-primary`) scoped to `[data-flavor="<flavor>"]`. Values are space-separated `R G B` triples for `<alpha-value>` support.

```ts
// globals.css
@import url('/path/to/themes/dist/tokens/morok.css');
@import url('/path/to/themes/dist/tokens/popil.css');
@import url('/path/to/themes/dist/tokens/vatra.css');

// tailwind.config.ts - preset is flavor-agnostic, any flavor file works
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

</details>

## Userstyles

1. Install the [Stylus browser extension](https://add0n.com/stylus.html)
2. In Stylus, open the extension popup, go to `Manage`, then `Import`
3. Select [`themes/dist/stylus/<flavor>.json`](themes/dist/stylus/): `morok`, `popil`, or `vatra`

Browse the available styles under [`themes/userstyles/styles/`](themes/userstyles/styles/).

## Thanks

Palette structure and token naming inspired by [Catppuccin](https://github.com/catppuccin/catppuccin).
