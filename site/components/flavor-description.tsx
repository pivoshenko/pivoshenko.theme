'use client'

import { useFlavor } from '@/lib/flavor-context'

const copy = {
  morok: (
    <>
      <em>Morok</em> (pronounced [mo-rok]) is a Ukrainian word that means
      "darkness" or "gloom". It is often used to describe a state of melancholy,
      sadness, or despair, and can also refer to a dark and gloomy atmosphere or
      environment.
    </>
  ),
  popil: (
    <>
      <em>Popil</em> (pronounced [po-pil]) is a Ukrainian word that means "ash".
      It evokes the warm grey embers smouldering after a fire has burned down, a
      faint lingering heat in the dark. That's the flavor's warm off-black ramp.
    </>
  ),
  vatra: (
    <>
      <em>Vatra</em> (pronounced [va-tra]) is a Ukrainian word for the
      Carpathian hearth fire, the open flame around which highland shepherds
      gather. Where popil is the ash, vatra is the fire still burning: warmer,
      more saturated, alive with orange and ember-yellow.
    </>
  ),
} as const

export function FlavorDescription() {
  const { flavor } = useFlavor()
  return <p className="type-body fg-body">{copy[flavor]}</p>
}
