import { ColorsSection } from '@/components/colors-section'
import { Examples } from '@/components/examples'
import { Hero } from '@/components/hero'
import { PortsGrid } from '@/components/ports-grid'
import { AccentProvider } from '@/lib/accent-context'
import { getPalette, getPorts } from '@/lib/theme-data'
import { SectionHeader } from 'pivoshenko.ui'

export default function HomePage() {
  const palette = getPalette()
  const ports = getPorts()
  const accents = palette.colors
    .filter((c) => c.group === 'accent')
    .map((c) => ({ name: c.name, hex: c.hex }))

  return (
    <AccentProvider accents={accents} defaultAccent="mauve">
      <div className="space-y-10">
        <Hero accents={accents} />

        <section className="space-y-4">
          <SectionHeader title="palette" />
          <ColorsSection colors={palette.colors} />
        </section>

        <section className="space-y-4">
          <SectionHeader title="ports" count={ports.length} />
          <PortsGrid ports={ports} />
        </section>

        <section className="space-y-4">
          <SectionHeader title="examples" />
          <p className="type-body fg-muted">
            Live previews — pick a tab to swap between the terminal mock and
            syntax-highlighted samples across languages.
          </p>
          <Examples />
        </section>

        <section className="space-y-4">
          <SectionHeader title="thanks" />
          <p className="type-body fg-body">
            Palette structure and token naming inspired by{' '}
            <a
              href="https://github.com/catppuccin/catppuccin"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-current/40 hover:decoration-current underline-offset-2 transition-colors"
            >
              Catppuccin
            </a>
            .
          </p>
        </section>
      </div>
    </AccentProvider>
  )
}
