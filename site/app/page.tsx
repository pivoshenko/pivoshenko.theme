import { PaletteExplorer } from '@/components/palette-explorer'
import { PortsGrid } from '@/components/ports-grid'
import { getPalette, getPorts } from '@/lib/theme-data'
import { SectionHeader } from 'pivoshenko.ui'

export default function HomePage() {
  const palette = getPalette()
  const ports = getPorts()

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="type-body fg-body">
          <a
            href="https://github.com/pivoshenko/pivoshenko.theme"
            className="underline decoration-[#c7b07a]/40 hover:decoration-[#c7b07a] underline-offset-2 transition-colors"
            style={{ color: '#c7b07a' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Morok
          </a>{' '}
          — a theme focused on minimalism, simplicity, and cross-tool
          consistency.
        </p>
        <p className="type-body fg-body">
          <em>Morok</em> (pronounced [mo-rok]) is a Ukrainian word that means
          “darkness” or “gloom”. It is often used to describe a state of
          melancholy, sadness, or despair, and can also refer to a dark and
          gloomy atmosphere or environment.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeader title="ports" count={ports.length} />
        <PortsGrid ports={ports} />
      </section>

      <section className="space-y-4">
        <SectionHeader title="colors" count={palette.colors.length} />
        <PaletteExplorer colors={palette.colors} />
      </section>
    </div>
  )
}
