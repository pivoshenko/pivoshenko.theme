'use client'

import { useFlavor } from '@/lib/flavor-context'
import { flavorCopy } from '@/lib/flavors'

export function FlavorDescription() {
  const { flavor } = useFlavor()
  return <p className="type-body fg-body">{flavorCopy[flavor].note}</p>
}
