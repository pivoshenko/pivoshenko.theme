import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export type PaletteColor = {
  name: string
  hex: string
  group: 'accent' | 'text' | 'surface'
}

export type PortFile = {
  name: string
  githubUrl: string
  rawUrl: string
}

export type PortGroup =
  | 'terminal'
  | 'shell'
  | 'editors'
  | 'git'
  | 'cli'
  | 'apps'
  | 'browser'
  | 'tokens'

export type Port = {
  name: string
  label: string
  group: PortGroup
  description: string
  extensions: string[]
  files: PortFile[]
  readmeUrl: string
  swatches: string[]
}

type PaletteFile = {
  name: string
  flavor: string
  colors: Record<string, string>
}

const themesRoot = join(process.cwd(), '..', 'themes')
const githubRepo = 'https://github.com/pivoshenko/pivoshenko.theme'
const githubRaw =
  'https://raw.githubusercontent.com/pivoshenko/pivoshenko.theme/main'

// == Ports ==

/** Running order of the groups on the ports page, outward from the terminal. */
export const PORT_GROUPS: Array<{ id: PortGroup; label: string }> = [
  { id: 'terminal', label: 'Terminal' },
  { id: 'shell', label: 'Shell' },
  { id: 'editors', label: 'Editors' },
  { id: 'git', label: 'Git' },
  { id: 'cli', label: 'CLI Tools' },
  { id: 'apps', label: 'Apps' },
  { id: 'browser', label: 'Browser' },
  { id: 'tokens', label: 'Design Tokens' },
]

// Hand-kept rather than derived from the template tree: which kind of tool a
// port dresses is an editorial claim, and a new template should not silently
// reshape the page by landing in whatever bucket its filename suggests
const portGroups: Record<string, PortGroup> = {
  bat: 'cli',
  bottom: 'cli',
  'css-vars': 'tokens',
  delta: 'git',
  discord: 'apps',
  fastfetch: 'terminal',
  fish: 'shell',
  fzf: 'cli',
  ghostty: 'terminal',
  helix: 'editors',
  herdr: 'terminal',
  k9s: 'cli',
  lazygit: 'git',
  'ls-colors': 'shell',
  obsidian: 'editors',
  preview: 'tokens',
  spicetify: 'apps',
  starship: 'shell',
  stylus: 'browser',
  tailwind: 'tokens',
  'tailwind-tokens': 'tokens',
  telegram: 'apps',
  tokens: 'tokens',
  vscode: 'editors',
  zed: 'editors',
  zellij: 'terminal',
  zen: 'browser',
}

// The directory name is the id; this is what a reader sees. Mostly a capital
// letter, but the acronyms and the two-word ports need spelling out, and these
// match the headings in README.md so the crumb and the section agree
const portLabels: Record<string, string> = {
  'css-vars': 'CSS Variables',
  k9s: 'K9s',
  'ls-colors': 'LS Colors',
  'tailwind-tokens': 'Tailwind Tokens',
  tokens: 'Design Tokens',
  vscode: 'VSCode',
}

function labelOf(name: string): string {
  return portLabels[name] ?? name.charAt(0).toUpperCase() + name.slice(1)
}

const portDescriptions: Record<string, string> = {
  bat: 'Syntax highlighting for the cat replacement, as a tmTheme the bat cache compiles in.',
  bottom:
    'Full config for the system monitor: graphs, tables and the process list.',
  'css-vars':
    'Every palette slot as a --<flavor>-<token> custom property on :root, for plain CSS.',
  delta:
    'Diff colours for the git pager, as a gitconfig fragment you include and switch on.',
  discord:
    'Client theme for Vesktop and BetterDiscord, loaded straight from a raw URL.',
  fastfetch:
    'A complete config.jsonc, so the fetch output lands in the same palette as the rest.',
  fish: 'Shell theme saved through fish_config, covering the prompt, pager and syntax colours.',
  fzf: 'Default options for the fuzzy finder, exported per flavor as a fish conf.d snippet.',
  ghostty:
    'Terminal palette and the sixteen ANSI slots, selected by name from the ghostty config.',
  helix:
    'Editor theme with the full tree-sitter scope map, not just the interface chrome.',
  herdr:
    'Theme block for the agent multiplexer, applied to a running server with a reload.',
  k9s: 'Skin for the Kubernetes TUI: views, tables, logs and the status bar.',
  lazygit: 'Theme section for the git TUI, mergeable into an existing config.',
  'ls-colors':
    'LS_COLORS and EZA_COLORS together, so listings, previews and completion agree.',
  obsidian:
    'Vault theme with its manifest, covering the editor, sidebars and the graph view.',
  preview:
    'A self-contained HTML sheet of every slot, for eyeballing a flavor in the browser.',
  spicetify: 'Colour scheme for the Spotify client, applied through spicetify.',
  starship:
    'The palette as a named starship table, so prompt modules reference slots by name.',
  stylus:
    'Every userstyle bundled into one Stylus import, restyling the sites worth restyling.',
  tailwind:
    'A Tailwind preset exposing colors.<flavor>.<token>, plus the JetBrains Mono stack.',
  'tailwind-tokens':
    'The flavor-agnostic preset that maps the semantic role tokens to utilities.',
  telegram: 'Desktop, iOS and macOS theme files, plus a deep link per flavor.',
  tokens:
    'Semantic role tokens as R G B triples under [data-flavor], for a runtime switcher.',
  vscode:
    'Colour overrides layered onto a Catppuccin theme through settings.json.',
  zed: 'Editor theme picked from the Zed theme selector, syntax scopes included.',
  zellij:
    'Theme block for the multiplexer: panes, tabs, the status bar and its modes.',
  zen: 'userChrome and userContent for the browser, dressing the shell and its internal pages.',
}

const readmeAnchors: Record<string, string> = {
  bat: 'bat',
  bottom: 'bottom',
  'css-vars': 'css-variables',
  delta: 'delta',
  discord: 'discord',
  fastfetch: 'fastfetch',
  fish: 'fish',
  fzf: 'fzf',
  ghostty: 'ghostty',
  helix: 'helix',
  herdr: 'herdr',
  k9s: 'k9s',
  lazygit: 'lazygit',
  'ls-colors': 'ls-colors',
  obsidian: 'obsidian',
  spicetify: 'spicetify',
  starship: 'starship',
  stylus: 'userstyles',
  tailwind: 'tailwind',
  'tailwind-tokens': 'design-tokens-semantic-switcher-ready',
  telegram: 'telegram',
  tokens: 'design-tokens-semantic-switcher-ready',
  vscode: 'vscode',
  zed: 'zed',
  zellij: 'zellij',
  zen: 'zen',
}

const portSwatches: Record<string, [string, string, string]> = {
  bat: ['base', 'text', 'yellow'],
  bottom: ['base', 'green', 'mauve'],
  'css-vars': ['base', 'text', 'lavender'],
  delta: ['base', 'green', 'red'],
  discord: ['mantle', 'text', 'blue'],
  fastfetch: ['base', 'text', 'peach'],
  fish: ['base', 'text', 'sky'],
  fzf: ['base', 'subtext1', 'mauve'],
  ghostty: ['base', 'text', 'mauve'],
  helix: ['base', 'text', 'mauve'],
  herdr: ['base', 'text', 'peach'],
  k9s: ['base', 'green', 'sapphire'],
  lazygit: ['base', 'green', 'mauve'],
  'ls-colors': ['base', 'blue', 'green'],
  obsidian: ['crust', 'text', 'mauve'],
  preview: ['base', 'text', 'rosewater'],
  spicetify: ['base', 'text', 'green'],
  starship: ['base', 'mauve', 'green'],
  stylus: ['base', 'text', 'lavender'],
  tailwind: ['base', 'text', 'lavender'],
  'tailwind-tokens': ['base', 'text', 'teal'],
  telegram: ['base', 'text', 'sky'],
  tokens: ['base', 'text', 'sapphire'],
  vscode: ['base', 'text', 'mauve'],
  zed: ['base', 'text', 'mauve'],
  zellij: ['base', 'text', 'sky'],
  zen: ['base', 'text', 'mauve'],
}

// == Palette ==

function colorGroup(name: string): PaletteColor['group'] {
  if (
    name === 'text' ||
    name.startsWith('subtext') ||
    name.startsWith('overlay')
  ) {
    return 'text'
  }
  if (
    name === 'base' ||
    name === 'mantle' ||
    name === 'crust' ||
    name.startsWith('surface')
  ) {
    return 'surface'
  }
  return 'accent'
}

export function getPalette(flavor: 'morok' | 'popil' | 'vatra' = 'morok') {
  const raw = readFileSync(
    join(themesRoot, 'palettes', `${flavor}.json`),
    'utf8',
  )
  const palette = JSON.parse(raw) as PaletteFile

  const colors: PaletteColor[] = Object.entries(palette.colors).map(
    ([name, hex]) => ({ name, hex, group: colorGroup(name) }),
  )

  return {
    name: palette.name,
    flavor: palette.flavor,
    colors,
    map: palette.colors,
  }
}

// A port's files are one per flavor, so the format is what actually varies
// between ports. The last segment only: `<flavor>.userChrome.css` is a css
// file, and filing it under its own tag would leave the filter a list of ones
function extensionsOf(files: PortFile[]): string[] {
  const seen = new Set<string>()
  for (const file of files) {
    const at = file.name.lastIndexOf('.')
    if (at > -1) seen.add(file.name.slice(at + 1).toLowerCase())
  }
  return Array.from(seen).sort()
}

const groupOrder = new Map(PORT_GROUPS.map((group, index) => [group.id, index]))

export function getPorts(): Port[] {
  const distDir = join(themesRoot, 'dist')
  const palette = getPalette()

  return readdirSync(distDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => {
      const files = readdirSync(join(distDir, entry.name), {
        withFileTypes: true,
      })
        .filter((file) => file.isFile() && !file.name.startsWith('.'))
        .map((file) => ({
          name: file.name,
          githubUrl: `${githubRepo}/blob/main/themes/dist/${entry.name}/${file.name}`,
          rawUrl: `${githubRaw}/themes/dist/${entry.name}/${file.name}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

      const tokens = portSwatches[entry.name] ?? ['base', 'text', 'mauve']

      return {
        name: entry.name,
        label: labelOf(entry.name),
        group: portGroups[entry.name] ?? 'cli',
        description: portDescriptions[entry.name] ?? '',
        extensions: extensionsOf(files),
        files,
        readmeUrl: `${githubRepo}#${readmeAnchors[entry.name] ?? 'ports'}`,
        swatches: tokens.map((t) => palette.map[t] ?? palette.map.base),
      }
    })
    .sort(
      (a, b) =>
        (groupOrder.get(a.group) ?? 99) - (groupOrder.get(b.group) ?? 99) ||
        a.label.localeCompare(b.label),
    )
}

export function getPortContent(
  port: string,
  file: string,
  maxLines = 60,
): string {
  try {
    const content = readFileSync(join(themesRoot, 'dist', port, file), 'utf8')
    return content.split('\n').slice(0, maxLines).join('\n')
  } catch {
    return ''
  }
}
