import type { Port } from '@/lib/theme-data'
import { Boxes, ExternalLink } from 'lucide-react'

type Props = {
  ports: Port[]
}

export function PortsGrid({ ports }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="type-heading fg-primary">Ports</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ports.map((port) => (
          <a
            key={port.name}
            href={port.readmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-ui bg-white dark:bg-stone-950 p-3 type-ui fg-primary hover-secondary transition-colors flex items-center justify-between gap-2"
          >
            <span className="inline-flex items-center gap-2">
              <Boxes aria-hidden="true" className="w-4 h-4" />
              {port.name}
            </span>
            <ExternalLink aria-hidden="true" className="w-3 h-3 fg-muted" />
          </a>
        ))}
      </div>
    </section>
  )
}
