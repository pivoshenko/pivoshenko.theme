'use client'

import { useFlavor } from '@/lib/flavor-context'
import { FLAVORS } from '@/lib/flavors'
import { Tab, Tabs } from 'pivoshenko.ui'

export function FlavorToggle() {
  const { flavor, setFlavor } = useFlavor()

  return (
    <Tabs>
      {FLAVORS.map((entry) => (
        <Tab
          key={entry.id}
          active={flavor === entry.id}
          onClick={() => setFlavor(entry.id)}
        >
          {entry.name}
        </Tab>
      ))}
    </Tabs>
  )
}
