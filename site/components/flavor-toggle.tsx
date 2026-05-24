'use client'

import { useFlavor } from '@/lib/flavor-context'
import { Tab, Tabs } from 'pivoshenko.ui'

export function FlavorToggle() {
  const { flavor, setFlavor } = useFlavor()

  return (
    <Tabs>
      <Tab active={flavor === 'morok'} onClick={() => setFlavor('morok')}>
        Morok
      </Tab>
      <Tab active={flavor === 'popil'} onClick={() => setFlavor('popil')}>
        Popil
      </Tab>
    </Tabs>
  )
}
