# pivoshenko.theme

<p align="center">
  <a href="https://stand-with-ukraine.pp.ua/">
    <img alt="StandWithUkraine" src="https://img.shields.io/badge/Support-Ukraine-FFC93C?style=flat-square&labelColor=07689F">
  </a>
</p>

- [pivoshenko.theme](#pivoshenkotheme)
  - [Overview](#overview)
  - [Ports](#ports)
    - [Bat](#bat)
    - [Bottom](#bottom)
    - [Delta](#delta)
    - [Fish](#fish)
    - [Fzf](#fzf)
    - [Ghostty](#ghostty)
    - [Helix](#helix)
    - [K9s](#k9s)
    - [Lazygit](#lazygit)
    - [Spicetify](#spicetify)
    - [Starship](#starship)
    - [VSCode](#vscode)
    - [Zen](#zen)
    - [Zellij](#zellij)

## Overview

My theme focused on minimalism, simplicity and cross-tool consistency.

The repository uses one palette and a set of Jinja templates to generate theme files for multiple tools. Source files live under `palettes/` and `templates/`, and rendered output is written to `dist/`.

## Ports

### Bat

1. Copy [`dist/bat/pivoshenko_night.tmTheme`](dist/bat/pivoshenko_night.tmTheme) to `~/.config/bat/themes/`.
2. Run `bat cache --build`.
3. Set `--theme="pivoshenko_night"` in `~/.config/bat/config`.

### Bottom

1. Copy [`dist/bottom/pivoshenko_night.toml`](dist/bottom/pivoshenko_night.toml) to `~/.config/bottom/bottom.toml`.
2. Start `btm`.

### Delta

1. Copy [`dist/delta/pivoshenko_night.gitconfig`](dist/delta/pivoshenko_night.gitconfig) to `~/.config/delta/themes/pivoshenko_night.gitconfig`.
2. Add `include = ~/.config/delta/themes/pivoshenko_night.gitconfig` under `[include]` in `~/.gitconfig`.
3. Set `features = pivoshenko_night` under `[delta]` in `~/.gitconfig`.

### Fish

1. Copy [`dist/fish/pivoshenko_night.theme`](dist/fish/pivoshenko_night.theme) to `~/.config/fish/themes/`.
2. Run `fish_config theme save pivoshenko_night`.

### Fzf

1. Copy [`dist/fzf/pivoshenko_night.fish`](dist/fzf/pivoshenko_night.fish) to `~/.config/fish/conf.d/`.
2. Start a new Fish session, or source the file manually.
3. Set `FZF_DEFAULT_OPTS="$FZF_PIVOSHENKO_NIGHT"` or append `$FZF_PIVOSHENKO_NIGHT` to your existing `FZF_DEFAULT_OPTS`.

### Ghostty

1. Copy [`dist/ghostty/pivoshenko_night.conf`](dist/ghostty/pivoshenko_night.conf) to `~/.config/ghostty/themes/pivoshenko_night`.
2. Set `theme = pivoshenko_night` in `~/.config/ghostty/config`.

### Helix

1. Copy [`dist/helix/pivoshenko_night.toml`](dist/helix/pivoshenko_night.toml) to `~/.config/helix/themes/pivoshenko_night.toml`.
2. Set `theme = "pivoshenko_night"` in `~/.config/helix/config.toml`.

### K9s

1. Copy [`dist/k9s/pivoshenko_night.yaml`](dist/k9s/pivoshenko_night.yaml) to `~/.config/k9s/skins/pivoshenko_night.yaml`.
2. Set `skin: pivoshenko_night` in `~/.config/k9s/config.yaml`.

### Lazygit

1. Copy [`dist/lazygit/pivoshenko_night.yml`](dist/lazygit/pivoshenko_night.yml) to `~/.config/lazygit/config.yml`.
2. Or merge only the `theme:` section into your existing config.

### Spicetify

1. Copy [`dist/spicetify/pivoshenko_night.color.ini`](dist/spicetify/pivoshenko_night.color.ini) to `~/.config/spicetify/Themes/pivoshenko_night/color.ini`.
2. Set `current_theme = pivoshenko_night` in your Spicetify config.
3. Run `spicetify apply`.

### Starship

1. Copy the palette from [`dist/starship/pivoshenko_night.toml`](dist/starship/pivoshenko_night.toml) to your [Starship configuration file](https://starship.rs/config/).
2. Set `palette = "pivoshenko_night"`, preferably near the top of your config.
3. Save and reload your prompt.

### VSCode

1. Copy [`dist/vscode/pivoshenko_night.json`](dist/vscode/pivoshenko_night.json) to a stable location, for example `~/.config/vscode/themes/pivoshenko_night.json`.
2. Reference it from a small local VS Code theme extension, or import it into your existing theme workflow.

> [!NOTE]
> VSCode does not load an arbitrary standalone theme JSON directly from settings alone. Treat this file as a generated theme source.

### Zen

1. Copy [`dist/zen/pivoshenko_night.userChrome.css`](dist/zen/pivoshenko_night.userChrome.css) and [`dist/zen/pivoshenko_night.userContent.css`](dist/zen/pivoshenko_night.userContent.css) into your Zen profile `chrome/` directory as `userChrome.css` and `userContent.css`.
2. Restart Zen Browser.

### Zellij

1. Copy the theme block from [`dist/zellij/pivoshenko_night.kdl`](dist/zellij/pivoshenko_night.kdl) into your Zellij config, or place it in a sourced theme file.
2. Set the active theme to `pivoshenko_night`.
