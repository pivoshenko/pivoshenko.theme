'use client'

import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { PaletteColor } from './theme-data'

export type Flavor = 'morok' | 'popil'

export type PaletteData = {
  name: string
  flavor: string
  colors: PaletteColor[]
  map: Record<string, string>
}

type FlavorContextValue = {
  flavor: Flavor
  setFlavor: (flavor: Flavor) => void
  palette: PaletteData
}

const FlavorContext = createContext<FlavorContextValue | null>(null)

export function FlavorProvider({
  palettes,
  defaultFlavor = 'morok',
  children,
}: {
  palettes: Record<Flavor, PaletteData>
  defaultFlavor?: Flavor
  children: ReactNode
}) {
  const [flavor, setFlavor] = useState<Flavor>(defaultFlavor)
  const palette = palettes[flavor]

  const value = useMemo(
    () => ({ flavor, setFlavor, palette }),
    [flavor, palette],
  )

  return (
    <FlavorContext.Provider value={value}>{children}</FlavorContext.Provider>
  )
}

export function useFlavor(): FlavorContextValue {
  const ctx = useContext(FlavorContext)
  if (!ctx) {
    throw new Error('useFlavor must be used within FlavorProvider')
  }
  return ctx
}
