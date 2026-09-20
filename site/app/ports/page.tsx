import { portEntry } from '@/components/port-entry'
import { getPorts } from '@/lib/theme-data'
import type { Metadata } from 'next'
import { Catalog, HeroBand, PageBody } from 'pivoshenko.ui'

export const metadata: Metadata = {
  title: 'Ports',
  description:
    'Every tool pivoshenko.theme dresses, grouped by the kind of application it is.',
}

export default function PortsPage() {
  const ports = getPorts()

  return (
    <>
      <HeroBand
        field="waves"
        tintAlt="peach"
        title={<span className="fg-title">Ports</span>}
      />
      <PageBody>
        {/* getPorts already returns the ports in group order, and Catalog
            buckets in first-appearance order, so the sections follow it */}
        <Catalog
          id="ports"
          title="Ports"
          entries={ports.map(portEntry)}
          layout="rows"
          link
        />
      </PageBody>
    </>
  )
}
