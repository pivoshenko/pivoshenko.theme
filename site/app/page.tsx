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
        <p className="type-body fg-body max-w-2xl">
          Morok is a warm, low-contrast palette built around stone neutrals and
          muted accents. One source-of-truth JSON renders into ports for
          terminals, editors, browsers, and notes — generated from Jinja
          templates and committed to the repo so consumers never need a build
          step.
        </p>
      </section>

      <section className="space-y-4">
        <SectionHeader title="colors" count={palette.colors.length} />
        <PaletteExplorer colors={palette.colors} />
      </section>

      <section className="space-y-4">
        <SectionHeader title="ports" count={ports.length} />
        <PortsGrid ports={ports} />
      </section>
    </div>
  )
}
