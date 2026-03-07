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
    - [Discord](#discord)
    - [Fish](#fish)
    - [Fzf](#fzf)
    - [Ghostty](#ghostty)
    - [Helix](#helix)
    - [K9s](#k9s)
    - [Lazygit](#lazygit)
    - [Obsidian](#obsidian)
    - [Spicetify](#spicetify)
    - [Starship](#starship)
    - [VSCode](#vscode)
    - [Zed](#zed)
    - [Zen](#zen)
    - [Zellij](#zellij)
  - [Userstyles](#userstyles)

## Overview

`morok` theme focused on minimalism, simplicity and cross-tool consistency.

Repository contains ports for various terminal applications and userstyles for popular websites. All ports are generated from a single source palette, ensuring a cohesive look across different tools and platforms.

**About the name**

*Morok* (pronounced [mo-rok]) is a Ukrainian word that means "darkness" or "gloom". It is often used to describe a state of melancholy, sadness, or despair. The word can also refer to a dark and gloomy atmosphere or environment.

## Ports

Generated palettes:
- `morok_dark` (dark flavor)
- `morok_light` (light flavor)

Examples below use `morok_dark`; swap to `morok_light` when needed (including `FZF_MOROK_LIGHT` for FZF).

### Bat

1. Copy [`dist/bat/morok_dark.tmTheme`](dist/bat/morok_dark.tmTheme) to `~/.config/bat/themes/`.
2. Run `bat cache --build`.
3. Set `--theme="morok_dark"` in `~/.config/bat/config`.

### Bottom

1. Copy [`dist/bottom/morok_dark.toml`](dist/bottom/morok_dark.toml) to `~/.config/bottom/bottom.toml`.
2. Start `btm`.

### Delta

1. Copy [`dist/delta/morok_dark.gitconfig`](dist/delta/morok_dark.gitconfig) to `~/.config/delta/themes/morok_dark.gitconfig`.
2. Add `include = ~/.config/delta/themes/morok_dark.gitconfig` under `[include]` in `~/.gitconfig`.
3. Set `features = morok_dark` under `[delta]` in `~/.gitconfig`.

### Discord

1. Copy [`dist/discord/morok_dark.theme.css`](dist/discord/morok_dark.theme.css) to your Discord themes folder (`~/.config/vesktop/themes/` for Vesktop, or BetterDiscord themes directory).
2. Enable the theme in your Discord client.

### Fish

1. Copy [`dist/fish/morok_dark.theme`](dist/fish/morok_dark.theme) to `~/.config/fish/themes/`.
2. Run `fish_config theme save morok_dark`.

### Fzf

1. Copy [`dist/fzf/morok_dark.fish`](dist/fzf/morok_dark.fish) to `~/.config/fish/conf.d/`.
2. Start a new Fish session, or source the file manually.
3. Set `FZF_DEFAULT_OPTS="$FZF_MOROK_DARK"` or append `$FZF_MOROK_DARK` to your existing `FZF_DEFAULT_OPTS`.

### Ghostty

1. Copy [`dist/ghostty/morok_dark.conf`](dist/ghostty/morok_dark.conf) to `~/.config/ghostty/themes/morok_dark`.
2. Set `theme = morok_dark` in `~/.config/ghostty/config`.

### Helix

1. Copy [`dist/helix/morok_dark.toml`](dist/helix/morok_dark.toml) to `~/.config/helix/themes/morok_dark.toml`.
2. Set `theme = "morok_dark"` in `~/.config/helix/config.toml`.

### K9s

1. Copy [`dist/k9s/morok_dark.yaml`](dist/k9s/morok_dark.yaml) to `~/.config/k9s/skins/morok_dark.yaml`.
2. Set `skin: morok_dark` in `~/.config/k9s/config.yaml`.

### Lazygit

1. Copy [`dist/lazygit/morok_dark.yml`](dist/lazygit/morok_dark.yml) to `~/.config/lazygit/config.yml`.
2. Or merge only the `theme:` section into your existing config.

### Obsidian

1. Copy [`dist/obsidian/morok_dark.css`](dist/obsidian/morok_dark.css) to your Obsidian theme folder and rename it to `theme.css`.
2. Optionally copy [`dist/obsidian/morok_dark.manifest.json`](dist/obsidian/morok_dark.manifest.json) and rename it to `manifest.json`.
3. Enable the theme in Obsidian Appearance settings.

### Spicetify

1. Copy [`dist/spicetify/morok_dark.color.ini`](dist/spicetify/morok_dark.color.ini) to `~/.config/spicetify/Themes/morok_dark/color.ini`.
2. Set `current_theme = morok_dark` in your Spicetify config.
3. Run `spicetify apply`.

### Starship

1. Copy the palette from [`dist/starship/morok_dark.toml`](dist/starship/morok_dark.toml) to your [Starship configuration file](https://starship.rs/config/).
2. Set `palette = "morok_dark"`, preferably near the top of your config.
3. Save and reload your prompt.

### VSCode

1. Copy [`dist/vscode/morok_dark.json`](dist/vscode/morok_dark.json) to a stable location, for example `~/.config/vscode/themes/morok_dark.json`.
2. Reference it from a small local VS Code theme extension, or import it into your existing theme workflow.

> [!NOTE]
> VSCode does not load an arbitrary standalone theme JSON directly from settings alone. Treat this file as a generated theme source.

### Zed

1. Copy [`dist/zed/morok_dark.json`](dist/zed/morok_dark.json) to a stable location, for example `~/.config/zed/themes/morok_dark.json`.
2. Open Zed and choose the theme from `Theme Selector` (or set it in your Zed settings).

### Zen

1. Copy [`dist/zen/morok_dark.userChrome.css`](dist/zen/morok_dark.userChrome.css) and [`dist/zen/morok_dark.userContent.css`](dist/zen/morok_dark.userContent.css) into your Zen profile `chrome/` directory as `userChrome.css` and `userContent.css`.
2. Restart Zen Browser.

### Zellij

1. Copy the theme block from [`dist/zellij/morok_dark.kdl`](dist/zellij/morok_dark.kdl) into your Zellij config, or place it in a sourced theme file.
2. Set the active theme to `morok_dark`.

## Userstyles

1. Install the [Stylus browser extension](https://add0n.com/stylus.html).
2. In Stylus, open the extension popup, go to `Manage`, then `Import`.
3. Select [`dist/stylus/morok.json`](dist/stylus/morok.json).

Default accent color is **blue**.

**Available styles:**
- advent-of-code
- alacritty.org
- alternativeto
- amplenote
- anilist
- anonymous-overflow
- arch-wiki
- boringproxy
- brave-search
- bsky
- bstats
- canvas-lms
- chatgpt
- chatreplay
- chess.com
- cinny
- claude
- cobalt
- codeberg
- crates.io
- crowdin
- deepl
- deepseek
- desmos
- dev.to
- devdocs
- docs.deno.com
- docs.rs
- duckduckgo
- ecosia
- elk
- freedesktop
- ghostty.org
- github
- gleam.run
- gmail
- go.dev
- google
- google-drive
- google-gemini
- google-photos
- grabify
- graphite
- hackage
- hacker-news
- have-i-been-pwned
- holodex
- home-manager-options-search
- homepage
- hoogle
- hoppscotch
- hyperpipe
- ichi.moe
- indie-wiki-buddy
- inoreader
- instagram
- invidious
- invokeai
- jisho
- keybr.com
- keyoxide
- lastfm
- learn-x-in-y-minutes
- lemmy
- libreddit
- lichess
- lingva
- linkedin
- listenbrainz
- lobste.rs
- mastodon
- mdbook
- mdn
- microsoft-word
- migadu-webmail
- minesweeper
- modrinth
- mullvad-leta
- namemc
- neovim.io
- nitter
- nixos-manual
- nixos-search
- npm
- ollama
- openmediavault
- paste.rs
- perplexity
- phanpy
- picrew
- pinterest
- planet-minecraft
- poe
- porkbun
- pronouns.cc
- pronouns.page
- proton
- pypi
- pythonanywhere
- quizlet
- raindrop
- react.dev
- reddit
- regex101
- rentry.co
- scalar
- searchix
- searxng
- seventv
- shinigami-eyes
- snapchat-web
- spotify-web
- stack-overflow
- startpage
- status.cafe
- stylus
- substack
- syncthing
- tabnews
- tldraw
- trinket
- tuta
- twitch
- twitter
- vercel
- vikunja
- web.dev
- whatsapp-web
- wiki.nixos.org
- wikipedia
- wikiwand
- youtube
- zen-browser-docs
