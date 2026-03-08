import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export type PaletteColor = {
  name: string
  hex: string
  group: 'accent' | 'text' | 'surface'
}

export type PortFile = {
  name: string
  githubUrl: string
}

export type Port = {
  name: string
  files: PortFile[]
  readmeUrl: string
}

type PaletteFile = {
  name: string
  flavor: string
  colors: Record<string, string>
}

const repoRoot = join(process.cwd(), '..')
const githubRepo = 'https://github.com/pivoshenko/pivoshenko.theme'
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

export function getPalette() {
  const raw = readFileSync(join(repoRoot, 'palettes', 'morok.json'), 'utf8')
  const palette = JSON.parse(raw) as PaletteFile

  const colors: PaletteColor[] = Object.entries(palette.colors).map(
    ([name, hex]) => ({
      name,
      hex,
      group: colorGroup(name),
    }),
  )

  return {
    name: palette.name,
    flavor: palette.flavor,
    colors,
  }
}

export function getPorts(): Port[] {
  const distDir = join(repoRoot, 'dist')
  const ports = readdirSync(distDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => {
      const files = readdirSync(join(distDir, entry.name), {
        withFileTypes: true,
      })
        .filter((file) => file.isFile() && !file.name.startsWith('.'))
        .map((file) => ({
          name: file.name,
          githubUrl: `${githubRepo}/blob/main/dist/${entry.name}/${file.name}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

      return {
        name: entry.name,
        files,
        readmeUrl: `${githubRepo}#${readmeAnchors[entry.name] ?? 'ports'}`,
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return ports
}
