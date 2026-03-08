import { PortsGrid } from '@/components/ports-grid'
import { getPorts } from '@/lib/theme-data'

export default function PortsPage() {
  const ports = getPorts()
  return <PortsGrid ports={ports} />
}
