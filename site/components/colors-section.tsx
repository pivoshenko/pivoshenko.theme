'use client'

import type { PaletteColor } from '@/lib/theme-data'
import { Grid3x3, Table } from 'lucide-react'
import { Tab, Tabs } from 'pivoshenko.ui'
import { useState } from 'react'
import { PaletteTable } from './palette-table'
import { PaletteWall } from './palette-wall'

export function ColorsSection({ colors }: { colors: PaletteColor[] }) {
  const [view, setView] = useState<'grid' | 'table'>('grid')

  return (
    <div className="space-y-4">
      <Tabs>
        <Tab active={view === 'grid'} onClick={() => setView('grid')}>
          <span className="inline-flex items-center gap-1.5">
            <Grid3x3 className="w-3.5 h-3.5" aria-hidden="true" />
            grid
          </span>
        </Tab>
        <Tab active={view === 'table'} onClick={() => setView('table')}>
          <span className="inline-flex items-center gap-1.5">
            <Table className="w-3.5 h-3.5" aria-hidden="true" />
            table
          </span>
        </Tab>
      </Tabs>
      {view === 'grid' ? (
        <PaletteWall colors={colors} />
      ) : (
        <PaletteTable colors={colors} />
      )}
    </div>
  )
}
