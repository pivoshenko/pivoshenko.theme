import { ColorsSection } from '@/components/colors-section'
import { renderExamples } from '@/components/examples'
import { ExamplesClient } from '@/components/examples-client'
import { FlavorDescription } from '@/components/flavor-description'
import { FlavorToggle } from '@/components/flavor-toggle'
import { Hero } from '@/components/hero'
import { PortsGrid } from '@/components/ports-grid'
import { AccentProvider } from '@/lib/accent-context'
import { FlavorProvider } from '@/lib/flavor-context'
import { getPalette, getPorts } from '@/lib/theme-data'
import { SectionHeader } from 'pivoshenko.ui'

export default async function HomePage() {
  const morok = getPalette('morok')
  const popil = getPalette('popil')
  const vatra = getPalette('vatra')
  const ports = getPorts()

  // accent slot *names* are identical across flavors (14 named slots).
  // values diverge per flavor — consumers should read hex from the
  // active palette via useFlavor().palette.map[name].
  const accents = morok.colors
    .filter((c) => c.group === 'accent')
    .map((c) => ({ name: c.name, hex: c.hex }))

  // shiki backgrounds track the bg ramp, so render a set per flavor.
  const exampleSets = {
    morok: await renderExamples(morok.map),
    popil: await renderExamples(popil.map),
    vatra: await renderExamples(vatra.map),
  }

  return (
    <FlavorProvider palettes={{ morok, popil, vatra }} defaultFlavor="morok">
      <AccentProvider accents={accents} defaultAccent="mauve">
        <div className="space-y-10">
          <Hero />

          <section className="space-y-4">
            <SectionHeader title="flavors" />
            <FlavorToggle />
            <FlavorDescription />
          </section>

          <section className="space-y-4">
            <SectionHeader title="palette" />
            <ColorsSection />
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
            <ExamplesClient sets={exampleSets} />
          </section>

          <section className="space-y-4">
            <SectionHeader title="thanks" />
            <p className="type-body fg-body">
              Palette structure and token naming inspired by{' '}
              <a
                href="https://github.com/catppuccin/catppuccin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Catppuccin
              </a>
              .
            </p>
          </section>
        </div>
      </AccentProvider>
    </FlavorProvider>
  )
}
