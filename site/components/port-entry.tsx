import { PORT_GROUPS, type Port } from '@/lib/theme-data'
import {
  Activity,
  BookOpen,
  Braces,
  Code,
  FileCode,
  GitBranch,
  Globe,
  Info,
  type LucideIcon,
  MessageCircle,
  Music,
  Palette,
  Search,
  Send,
  Server,
  Terminal,
  Wind,
} from 'lucide-react'
import type { CatalogEntry } from 'pivoshenko.ui'

const portIcons: Record<string, LucideIcon> = {
  bat: Terminal,
  bottom: Activity,
  'css-vars': Palette,
  delta: GitBranch,
  discord: MessageCircle,
  fastfetch: Info,
  fish: Terminal,
  fzf: Search,
  ghostty: Terminal,
  helix: Code,
  herdr: Server,
  k9s: Activity,
  lazygit: GitBranch,
  'ls-colors': FileCode,
  obsidian: BookOpen,
  preview: Globe,
  spicetify: Music,
  starship: Terminal,
  stylus: Palette,
  tailwind: Wind,
  'tailwind-tokens': Wind,
  telegram: Send,
  tokens: Braces,
  vscode: Code,
  zed: Code,
  zellij: Terminal,
  zen: Globe,
}

const groupLabels = new Map(PORT_GROUPS.map((group) => [group.id, group.label]))

// The crumb is the entry's one link, so it points at the install steps rather
// than at the generated file - the file is a click further on from there
export function portEntry(port: Port): CatalogEntry {
  const Icon = portIcons[port.name] ?? Palette
  return {
    id: port.name,
    name: port.label,
    description: port.description,
    tags: port.extensions,
    group: groupLabels.get(port.group) ?? port.group,
    path: `README#${port.name}`,
    href: port.readmeUrl,
    icon: <Icon size={18} strokeWidth={2} aria-hidden="true" />,
  }
}
