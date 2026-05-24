# pivoshenko.theme

<p align="left">
  <a href="https://stand-with-ukraine.pp.ua/">
    <img alt="StandWithUkraine" src="https://img.shields.io/badge/Support-Ukraine-FFC93C?style=flat-square&labelColor=07689F">
  </a>
</p>

## Overview

A dark theme focused on minimalism, simplicity and cross-tool consistency, shipped in two flavors:

- **`Morok`** features pitch black — neutral greys on a true-black floor.
- **`Popil`** features warm ash — the same palette lifted off black with a warm tint.

Both flavors share identical accents, neutrals, and ports — only the background ramp differs (cold black vs warm). Pick `morok` for maximum contrast, `popil` for a softer, warmer dark.

> Preview the palette, compare both flavors, and browse the ports live at **[theme.pivoshenko.dev](https://theme.pivoshenko.dev/)**.

Repository contains ports for various terminal applications and userstyles for popular websites. All ports are generated from the source palettes (`themes/palettes/morok.json`, `themes/palettes/popil.json`) against shared templates, ensuring a cohesive look across different tools and platforms. Every port below ships as both `themes/dist/<tool>/morok.<ext>` and `themes/dist/<tool>/popil.<ext>` — swap the filename to use the warm flavor.

See [pivoshenko.dotfiles](https://github.com/pivoshenko/pivoshenko.dotfiles) for a real-world setup consuming the theme across fish, starship, helix, ghostty, zed, k9s, bottom, lazygit, zellij, bat, spicetify, and stylus.

**About the names**

*Morok* (pronounced [mo-rok]) is a Ukrainian word that means "darkness" or "gloom". It is often used to describe a state of melancholy, sadness, or despair, or a dark and gloomy atmosphere.

*Popil* (pronounced [po-pil]) is a Ukrainian word that means "ash". It evokes the warm grey embers smouldering after a fire has burned down — a faint, lingering heat in the dark. It carries a sense of quiet aftermath: of what remains, still warm, once the flame is gone — mirroring this flavor's warm off-black ramp.

## Ports

#### Bat

1. Copy [`themes/dist/bat/morok.tmTheme`](themes/dist/bat/morok.tmTheme) to `~/.config/bat/themes/`.
2. Run `bat cache --build`.
3. Set `--theme="morok"` in `~/.config/bat/config`.

#### Bottom

1. Copy [`themes/dist/bottom/morok.toml`](themes/dist/bottom/morok.toml) to `~/.config/bottom/bottom.toml`.
2. Start `btm`.

#### Delta

1. Copy [`themes/dist/delta/morok.gitconfig`](themes/dist/delta/morok.gitconfig) to `~/.config/delta/themes/morok.gitconfig`.
2. Add `include = ~/.config/delta/themes/morok.gitconfig` under `[include]` in `~/.gitconfig`.
3. Set `features = morok` under `[delta]` in `~/.gitconfig`.

#### Discord

1. Copy [`themes/dist/discord/morok.theme.css`](themes/dist/discord/morok.theme.css) to your Discord themes folder (`~/.config/vesktop/themes/` for Vesktop, or BetterDiscord themes directory).
2. Enable the theme in your Discord client.

#### Fish

1. Copy [`themes/dist/fish/morok.theme`](themes/dist/fish/morok.theme) to `~/.config/fish/themes/`.
2. Run `fish_config theme save morok`.

#### Fzf

1. Copy [`themes/dist/fzf/morok.fish`](themes/dist/fzf/morok.fish) to `~/.config/fish/conf.d/`.
2. Start a new Fish session, or source the file manually.
3. Set `FZF_DEFAULT_OPTS="$FZF_MOROK_DARK"` or append `$FZF_MOROK_DARK` to your existing `FZF_DEFAULT_OPTS`.

#### Ghostty

1. Copy [`themes/dist/ghostty/morok.conf`](themes/dist/ghostty/morok.conf) to `~/.config/ghostty/themes/morok`.
2. Set `theme = morok` in `~/.config/ghostty/config`.

#### Helix

1. Copy [`themes/dist/helix/morok.toml`](themes/dist/helix/morok.toml) to `~/.config/helix/themes/morok.toml`.
2. Set `theme = "morok"` in `~/.config/helix/config.toml`.

#### K9s

1. Copy [`themes/dist/k9s/morok.yaml`](themes/dist/k9s/morok.yaml) to `~/.config/k9s/skins/morok.yaml`.
2. Set `skin: morok` in `~/.config/k9s/config.yaml`.

#### Lazygit

1. Copy [`themes/dist/lazygit/morok.yml`](themes/dist/lazygit/morok.yml) to `~/.config/lazygit/config.yml`.
2. Or merge only the `theme:` section into your existing config.

#### Obsidian

1. Copy [`themes/dist/obsidian/morok.css`](themes/dist/obsidian/morok.css) to your Obsidian theme folder and rename it to `theme.css`.
2. Optionally copy [`themes/dist/obsidian/morok.manifest.json`](themes/dist/obsidian/morok.manifest.json) and rename it to `manifest.json`.
3. Enable the theme in Obsidian Appearance settings.

#### Spicetify

1. Copy [`themes/dist/spicetify/morok.color.ini`](themes/dist/spicetify/morok.color.ini) to `~/.config/spicetify/Themes/morok/color.ini`.
2. Set `current_theme = morok` in your Spicetify config.
3. Run `spicetify apply`.

#### Starship

1. Copy the palette from [`themes/dist/starship/morok.toml`](themes/dist/starship/morok.toml) to your [Starship configuration file](https://starship.rs/config/).
2. Set `palette = "morok"`, preferably near the top of your config.
3. Save and reload your prompt.

#### Telegram

1. Open the theme deep link in Telegram: [`pivoshenko_theme_morok`](https://t.me/addtheme/pivoshenko_theme_morok) or [`pivoshenko_theme_popil`](https://t.me/addtheme/pivoshenko_theme_popil).
2. Tap "Apply Theme".

Platform-specific source files live in [`themes/dist/telegram/`](themes/dist/telegram/) (`*-desktop`, `*-ios`, `*-macos`).

#### VSCode

1. Install a Catppuccin VSCode theme (for example `Catppuccin Mocha`).
2. Open the generated override snippet [`themes/dist/vscode/morok.json`](themes/dist/vscode/morok.json).
3. Merge its `catppuccin.colorOverrides` block into your VSCode `settings.json`.

#### Zed

1. Copy [`themes/dist/zed/morok.json`](themes/dist/zed/morok.json) to a stable location, for example `~/.config/zed/themes/morok.json`.
2. Open Zed and choose the theme from `Theme Selector` (or set it in your Zed settings).

#### Zen

1. Copy [`themes/dist/zen/morok.userChrome.css`](themes/dist/zen/morok.userChrome.css) and [`themes/dist/zen/morok.userContent.css`](themes/dist/zen/morok.userContent.css) into your Zen profile `chrome/` directory as `userChrome.css` and `userContent.css`.
2. Restart Zen Browser.

#### Zellij

1. Copy the theme block from [`themes/dist/zellij/morok.kdl`](themes/dist/zellij/morok.kdl) into your Zellij config, or place it in a sourced theme file.
2. Set the active theme to `morok`.

#### Tailwind

For Next.js / Tailwind 3 sites in the pivoshenko.* ecosystem.

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import morok from './path/to/themes/dist/tailwind/morok.js'

export default {
  presets: [morok],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
} satisfies Config
```

Exposes `colors.morok.<token>` (e.g. `bg-morok-base`, `text-morok-blue`) plus a JetBrains Mono font stack and `darkMode: 'class'`. Consumed in production via [pivoshenko.ui](https://github.com/pivoshenko/pivoshenko.ui) as `@pivoshenko/tailwind-preset`.

#### CSS Variables

For plain-CSS surfaces and design-system docs.

```css
@import url('/path/to/themes/dist/css-vars/morok.css');

.button { background: var(--morok-blue); color: var(--morok-text); }
```

Every palette token becomes a `--morok-<token>` custom property on `:root`.

## Userstyles

1. Install the [Stylus browser extension](https://add0n.com/stylus.html).
2. In Stylus, open the extension popup, go to `Manage`, then `Import`.
3. Select [`themes/dist/stylus/morok.json`](themes/dist/stylus/morok.json).

Default accent color is **blue**.

Browse the available styles under [`themes/userstyles/styles/`](themes/userstyles/styles/).

## Thanks

Palette structure and token naming inspired by [Catppuccin](https://github.com/catppuccin/catppuccin).
