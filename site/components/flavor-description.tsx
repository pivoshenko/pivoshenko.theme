'use client'

import { useFlavor } from '@/lib/flavor-context'

const copy = {
  morok: (
    <>
      <em>Morok</em> (pronounced [mo-rok]) is a Ukrainian word that means
      “darkness” or “gloom”. It is often used to describe a state of melancholy,
      sadness, or despair, and can also refer to a dark and gloomy atmosphere or
      environment.
    </>
  ),
  popil: (
    <>
      <em>Popil</em> (pronounced [po-pil]) is a Ukrainian word that means “ash”.
      It evokes the warm grey embers smouldering after a fire has burned down —
      a faint, lingering heat in the dark, mirroring this flavor’s warm
      off-black ramp.
    </>
  ),
} as const

export function FlavorDescription() {
  const { flavor } = useFlavor()
  return <p className="type-body fg-body">{copy[flavor]}</p>
}
