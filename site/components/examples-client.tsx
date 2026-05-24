'use client'

import { type Flavor, useFlavor } from '@/lib/flavor-context'
import { type CodeExample, ExamplesSection } from './examples-section'

export function ExamplesClient({
  sets,
}: {
  sets: Record<Flavor, CodeExample[]>
}) {
  const { flavor, palette } = useFlavor()
  return <ExamplesSection examples={sets[flavor]} palette={palette.map} />
}
