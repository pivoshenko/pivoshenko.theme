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

export type Port = {
  name: string
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
const readmeAnchors: Record<string, string> = {
  bat: 'bat',
  bottom: 'bottom',
  delta: 'delta',
  discord: 'discord',
  fish: 'fish',
  fzf: 'fzf',
  ghostty: 'ghostty',
  helix: 'helix',
  k9s: 'k9s',
  lazygit: 'lazygit',
  obsidian: 'obsidian',
  spicetify: 'spicetify',
  starship: 'starship',
  vscode: 'vscode',
  zed: 'zed',
  zen: 'zen',
  zellij: 'zellij',
}

const portSwatches: Record<string, [string, string, string]> = {
  bat: ['base', 'text', 'yellow'],
  bottom: ['base', 'green', 'mauve'],
  'css-vars': ['base', 'text', 'lavender'],
  delta: ['base', 'green', 'red'],
  discord: ['mantle', 'text', 'blue'],
  fish: ['base', 'text', 'sky'],
  fzf: ['base', 'subtext1', 'mauve'],
  ghostty: ['base', 'text', 'mauve'],
  helix: ['base', 'text', 'mauve'],
  k9s: ['base', 'green', 'sapphire'],
  lazygit: ['base', 'green', 'mauve'],
  obsidian: ['crust', 'text', 'mauve'],
  spicetify: ['base', 'text', 'green'],
  starship: ['base', 'mauve', 'green'],
  stylus: ['base', 'text', 'lavender'],
  tailwind: ['base', 'text', 'lavender'],
  telegram: ['base', 'text', 'sky'],
  vscode: ['base', 'text', 'mauve'],
  zed: ['base', 'text', 'mauve'],
  zellij: ['base', 'text', 'sky'],
  zen: ['base', 'text', 'mauve'],
}

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

export function getPalette(flavor: 'morok' | 'popil' = 'morok') {
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

export function getPorts(): Port[] {
  const distDir = join(themesRoot, 'dist')
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

      const palette = getPalette()
      const tokens = portSwatches[entry.name] ?? ['base', 'text', 'mauve']
      const swatches = tokens.map((t) => palette.map[t] ?? '#000000')

      return {
        name: entry.name,
        files,
        readmeUrl: `${githubRepo}#${readmeAnchors[entry.name] ?? 'ports'}`,
        swatches,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
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
