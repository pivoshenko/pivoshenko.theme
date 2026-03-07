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

Currently supported ports:

- Bat
- Bottom
- Delta
- Fish
- Fzf
- Ghostty
- Helix
- K9s
- Lazygit
- Spicetify
- Starship
- VSCode
- Zen
- Zellij

### Bat

Generated file:

- `dist/bat/pivoshenko_night.tmTheme`

Install:

1. Copy the theme file to `~/.config/bat/themes/`
2. Run `bat cache --build`
3. Set `--theme="pivoshenko_night"` in `~/.config/bat/config`

### Bottom

Generated file:

- `dist/bottom/pivoshenko_night.toml`

Install:

1. Copy the file to `~/.config/bottom/bottom.toml`
2. Start `btm` normally and it will use that config

### Delta

Generated file:

- `dist/delta/pivoshenko_night.gitconfig`

Install:

1. Copy the file somewhere stable, for example `~/.config/delta/themes/pivoshenko_night.gitconfig`
2. Add `include = ~/.config/delta/themes/pivoshenko_night.gitconfig` under `[include]` in `~/.gitconfig`
3. Set `features = pivoshenko_night` under `[delta]` in `~/.gitconfig`

### Fish

Generated file:

- `dist/fish/pivoshenko_night.theme`

Install:

1. Copy the file to `~/.config/fish/themes/`
2. Activate it with `fish_config theme save pivoshenko_night`

### Fzf

Generated file:

- `dist/fzf/pivoshenko_night.fish`

Install:

1. Copy the file to `~/.config/fish/conf.d/` or another sourced Fish config location
2. Start a new Fish session, or source the file manually
3. Export `FZF_DEFAULT_OPTS="$FZF_PIVOSHENKO_NIGHT"` or append `$FZF_PIVOSHENKO_NIGHT` to your existing `FZF_DEFAULT_OPTS`

### Ghostty

Generated file:

- `dist/ghostty/pivoshenko_night.conf`

Install:

1. Copy the file to `~/.config/ghostty/themes/pivoshenko_night`
2. Set `theme = pivoshenko_night` in `~/.config/ghostty/config`

### Helix

Generated file:

- `dist/helix/pivoshenko_night.toml`

Install:

1. Copy the file to `~/.config/helix/themes/pivoshenko_night.toml`
2. Set `theme = "pivoshenko_night"` in `~/.config/helix/config.toml`

### K9s

Generated file:

- `dist/k9s/pivoshenko_night.yaml`

Install:

1. Copy the file to `~/.config/k9s/skins/pivoshenko_night.yaml`
2. Set `skin: pivoshenko_night` in `~/.config/k9s/config.yaml`

### Lazygit

Generated file:

- `dist/lazygit/pivoshenko_night.yml`

Install:

1. Copy the file to `~/.config/lazygit/config.yml`
2. Or merge the `theme:` section into your existing `~/.config/lazygit/config.yml`

### Spicetify

Generated file:

- `dist/spicetify/pivoshenko_night.color.ini`

Install:

1. Copy the file to `~/.config/spicetify/Themes/pivoshenko_night/color.ini`
2. Make sure the theme directory exists and contains the rest of the theme assets you want to use
3. Set `current_theme = pivoshenko_night` in the Spicetify config
4. Run `spicetify apply`

### Starship

Generated file:

- `dist/starship/pivoshenko_night.toml`

Install:

1. Copy the palette block into your `~/.config/starship.toml`
2. Or use this file as your full Starship config if that is what you want

### VSCode

Generated file:

- `dist/vscode/pivoshenko_night.json`

Install:

1. Copy the file to a convenient location, for example `~/.config/vscode/themes/pivoshenko_night.json`
2. Reference it from a small local theme extension, or import it into your existing VS Code theme workflow

Note:

- VS Code does not load arbitrary standalone theme JSON files directly from settings alone, so this port is best treated as a generated theme source file

### Zen

Generated files:

- `dist/zen/pivoshenko_night.userChrome.css`
- `dist/zen/pivoshenko_night.userContent.css`

Install:

1. Copy the files into your Zen profile `chrome/` directory as `userChrome.css` and `userContent.css`
2. Restart Zen Browser

### Zellij

Generated file:

- `dist/zellij/pivoshenko_night.kdl`

Install:

1. Copy the theme block into your Zellij config, or place it in a sourced theme file
2. Set the active theme to `pivoshenko_night` in your Zellij configuration
