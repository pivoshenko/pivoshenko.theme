import { PaletteExplorer } from '@/components/palette-explorer'
import { getPalette } from '@/lib/theme-data'

export default function ColorsPage() {
  const palette = getPalette()
  return <PaletteExplorer colors={palette.colors} />
}
