import { ColorsSection } from '@/components/colors-section'
import { renderExamples } from '@/components/examples'
import { ExamplesClient } from '@/components/examples-client'
import { FlavorDescription } from '@/components/flavor-description'
import { FlavorToggle } from '@/components/flavor-toggle'
import { AccentProvider } from '@/lib/accent-context'
import { FlavorProvider } from '@/lib/flavor-context'
import { getPalette } from '@/lib/theme-data'
import type { Metadata } from 'next'
import { HeroBand, PageBody, SectionHeader } from 'pivoshenko.ui'

export const metadata: Metadata = {
  title: 'Palette',
  description:
    'The named colour slots of morok, popil and vatra, and the code they render.',
}

export default async function PalettePage() {
  const morok = getPalette('morok')
  const popil = getPalette('popil')
  const vatra = getPalette('vatra')

  // slot names are identical across flavors, only the hex values differ, so
  // consumers read hex from the active palette via useFlavor().palette.map
  const accents = morok.colors
    .filter((c) => c.group === 'accent')
    .map((c) => ({ name: c.name, hex: c.hex }))

  // shiki backgrounds track the bg ramp, so render a set per flavor
  const exampleSets = {
    morok: await renderExamples(morok.map),
    popil: await renderExamples(popil.map),
    vatra: await renderExamples(vatra.map),
  }

  return (
    <FlavorProvider palettes={{ morok, popil, vatra }} defaultFlavor="morok">
      <AccentProvider accents={accents} defaultAccent="mauve">
        <HeroBand
          field="waves"
          tintAlt="peach"
          title={<span className="fg-title">Palette</span>}
        />
        <PageBody className="space-y-12">
          <section className="space-y-4">
            <FlavorToggle />
            <FlavorDescription />
          </section>

          <section id="colors" className="scroll-mt-24 space-y-2">
            <SectionHeader title="Colors" count={morok.colors.length} />
            <ColorsSection />
          </section>

          <section id="examples" className="scroll-mt-24 space-y-2">
            <SectionHeader title="Examples" />
            <p className="type-body fg-muted mb-4">
              Pick a tab to swap between the terminal mock and
              syntax-highlighted samples across languages.
            </p>
            <ExamplesClient sets={exampleSets} />
          </section>
        </PageBody>
      </AccentProvider>
    </FlavorProvider>
  )
}
