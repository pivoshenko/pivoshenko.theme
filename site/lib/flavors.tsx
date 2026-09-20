import type { ReactNode } from 'react'

export type Flavor = 'morok' | 'popil' | 'vatra'

export type FlavorCopy = {
  id: Flavor
  name: string
  say: string
  means: string
  /** One line for the landing card */
  blurb: string
  /** The full note, shown next to the flavor toggle */
  note: ReactNode
}

export const FLAVORS: FlavorCopy[] = [
  {
    id: 'morok',
    name: 'Morok',
    say: 'mo-rok',
    means: 'darkness',
    blurb:
      'The starkest of the three: deepest floor, coolest tone, maximum contrast.',
    note: (
      <>
        <em>Morok</em> is a Ukrainian word for "darkness" or "gloom", the one
        used for a state of melancholy as readily as for an unlit room. The
        flavor takes it literally: the floor drops further than the other two
        and the text sits further above it, so every accent has room to carry.
      </>
    ),
  },
  {
    id: 'popil',
    name: 'Popil',
    say: 'po-pil',
    means: 'ash',
    blurb:
      'Warm, muted and restrained, and the house flavor for brand surfaces.',
    note: (
      <>
        <em>Popil</em> is a Ukrainian word for "ash": the embers still
        smouldering after a fire has burned down, a faint lingering heat in the
        dark. That is the flavor's warm off-black ramp, and the one the
        pivoshenko sites are built on.
      </>
    ),
  },
  {
    id: 'vatra',
    name: 'Vatra',
    say: 'va-tra',
    means: 'hearth fire',
    blurb:
      'Popil a moment earlier, with the fire still burning: punchier and more saturated.',
    note: (
      <>
        <em>Vatra</em> is the Carpathian hearth fire, the open flame highland
        shepherds gather around. Where popil is the ash, vatra is the fire still
        burning: the same warm base, but the accents pushed up until they read
        across a room.
      </>
    ),
  },
]

export const flavorCopy = Object.fromEntries(
  FLAVORS.map((flavor) => [flavor.id, flavor]),
) as Record<Flavor, FlavorCopy>
