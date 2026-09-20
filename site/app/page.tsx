import { Browse } from '@/components/browse'
import { Flavors } from '@/components/flavors'
import { getPalette, getPorts } from '@/lib/theme-data'
import { HeroBand, Highlights, PageBody, SectionHeader } from 'pivoshenko.ui'

const highlights = [
  {
    title: 'One palette, every tool',
    body: 'The same 26 named slots dress the terminal, the editor, the git pager and the browser, so a colour means the same thing wherever you meet it.',
  },
  {
    title: 'Three flavors, one shape',
    body: 'Every port exists for all three flavors and every flavor fills every slot. Switching is a filename, never a different theme with a similar name.',
  },
  {
    title: 'Generated, not hand-tuned',
    body: 'Each port is rendered from the source palette against a template, so a colour correction reaches every tool in one pass instead of drifting apart.',
  },
]

export default function HomePage() {
  const palettes = {
    morok: getPalette('morok'),
    popil: getPalette('popil'),
    vatra: getPalette('vatra'),
  }
  const ports = getPorts()
  const slots = palettes.morok.colors.length

  return (
    <>
      <HeroBand
        field="waves"
        tintAlt="peach"
        title={
          <>
            <span className="fg-title">pivoshenko</span>
            <span className="fg-muted">.</span>
            <span className="text-accent">theme</span>
          </>
        }
        lead="Dark themes focused on minimalism, simplicity and cross-tool consistency."
      >
        <p className="type-body fg-body mt-4">
          Most themes are made one tool at a time, which is why your terminal
          and your editor never quite agree on what green is. This one starts
          from a palette and generates the rest.
        </p>
      </HeroBand>

      <PageBody className="space-y-12">
        <section className="space-y-2">
          <SectionHeader title="Why" />
          <Highlights items={highlights} className="text-center" />
        </section>

        <section id="flavors" className="scroll-mt-24 space-y-2">
          <SectionHeader title="Flavors" count={3} />
          <Flavors palettes={palettes} />
        </section>

        <Browse
          destinations={[
            {
              href: '/ports',
              title: 'Ports',
              count: ports.length,
              description:
                'Every tool the theme dresses, grouped by the kind of application it is, with install steps behind each one',
            },
            {
              href: '/palette',
              title: 'Palette',
              count: slots,
              description:
                'The named slots of each flavor, side by side with the code samples they render',
            },
          ]}
        />

        <section className="space-y-2">
          <SectionHeader title="Thanks" />
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
      </PageBody>
    </>
  )
}
