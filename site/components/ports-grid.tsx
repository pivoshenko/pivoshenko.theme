import type { Port } from '@/lib/theme-data'
import {
  Activity,
  BookOpen,
  Code,
  ExternalLink,
  GitBranch,
  Globe,
  type LucideIcon,
  MessageCircle,
  Music,
  Palette,
  Search,
  Send,
  Server,
  Terminal,
} from 'lucide-react'

type Props = {
  ports: Port[]
}

const portIcons: Record<string, LucideIcon> = {
  bat: Terminal,
  bottom: Activity,
  'css-vars': Palette,
  delta: GitBranch,
  discord: MessageCircle,
  fish: Terminal,
  fzf: Search,
  ghostty: Terminal,
  helix: Code,
  herdr: Server,
  k9s: Activity,
  lazygit: GitBranch,
  obsidian: BookOpen,
  spicetify: Music,
  starship: Terminal,
  stylus: Palette,
  tailwind: Palette,
  telegram: Send,
  vscode: Code,
  zed: Code,
  zellij: Terminal,
  zen: Globe,
}

export function PortsGrid({ ports }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {ports.map((port) => {
        const Icon = portIcons[port.name] ?? Palette
        return (
          <a
            key={port.name}
            href={port.readmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-ui bg-bg-surface p-3 flex items-center justify-between gap-3 hover:border-border-strong transition-colors"
          >
            <span className="inline-flex items-center gap-2 type-ui fg-primary">
              <Icon aria-hidden="true" className="w-4 h-4" />
              {port.name}
            </span>
            <ExternalLink aria-hidden="true" className="w-3 h-3 fg-muted" />
          </a>
        )
      })}
    </div>
  )
}
