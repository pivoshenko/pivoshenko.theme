'use client'

import { useAccent } from '@/lib/accent-context'
import { hexToRgb } from '@/lib/contrast'
import type { PaletteColor } from '@/lib/theme-data'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

type Props = {
  colors: PaletteColor[]
}

export function PaletteWall({ colors }: Props) {
  const { pinned, pin, copy, copied } = useAccent()
  const [hovered, setHovered] = useState<string | null>(null)

  const accents = colors.filter((c) => c.group === 'accent')
  const texts = colors.filter((c) => c.group === 'text')
  const surfaces = colors.filter((c) => c.group === 'surface')

  return (
    <div className="space-y-6" onPointerLeave={() => setHovered(null)}>
      <Group title="surface" cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {surfaces.map((c) => (
          <Swatch
            key={c.name}
            color={c}
            dimmed={hovered !== null && hovered !== c.name}
            pinned={false}
            copied={copied === c.hex}
            onHover={setHovered}
            onClick={() => {
              void copy(c.hex)
            }}
          />
        ))}
      </Group>

      <Group title="accent" cols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
        {accents.map((c) => (
          <Swatch
            key={c.name}
            color={c}
            dimmed={hovered !== null && hovered !== c.name}
            pinned={pinned?.name === c.name}
            copied={copied === c.hex}
            onHover={setHovered}
            onClick={() => {
              pin({ name: c.name, hex: c.hex })
              void copy(c.hex)
            }}
            tall
          />
        ))}
      </Group>

      <Group title="text" cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {texts.map((c) => (
          <Swatch
            key={c.name}
            color={c}
            dimmed={hovered !== null && hovered !== c.name}
            pinned={false}
            copied={copied === c.hex}
            onHover={setHovered}
            onClick={() => {
              void copy(c.hex)
            }}
          />
        ))}
      </Group>
    </div>
  )
}

function Group({
  title,
  cols,
  children,
}: {
  title: string
  cols: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <h3 className="type-label fg-muted uppercase tracking-wider">{title}</h3>
      <div className={`grid gap-2 ${cols}`}>{children}</div>
    </div>
  )
}

function Swatch({
  color,
  dimmed,
  pinned,
  copied,
  onHover,
  onClick,
  tall = false,
}: {
  color: PaletteColor
  dimmed: boolean
  pinned: boolean
  copied: boolean
  onHover: (name: string | null) => void
  onClick: () => void
  tall?: boolean
}) {
  const rgb = hexToRgb(color.hex)
  const isLight = rgb ? rgb.r + rgb.g + rgb.b > 380 : false
  // absolute contrast pair: swatches render arbitrary palette colors, so role tokens don't apply
  const fg = isLight ? '#0c0a09' : '#e7e5e4'

  return (
    <button
      type="button"
      onPointerEnter={() => onHover(color.name)}
      onClick={onClick}
      aria-label={`Copy ${color.name} (${color.hex})`}
      className={`group relative ${tall ? 'h-24' : 'h-20'} rounded-lg border border-ui overflow-hidden text-left transition-all duration-200 ${
        dimmed ? 'opacity-30 scale-[0.98]' : 'opacity-100'
      }`}
      style={{
        backgroundColor: color.hex,
        color: fg,
      }}
    >
      <div className="absolute inset-0 p-2.5 flex flex-col justify-between">
        <span className="font-mono text-xs font-medium leading-none">
          {color.name}
          {pinned ? '' : ''}
        </span>
        <div className="flex items-end justify-between gap-1">
          <span className="font-mono text-[10px] opacity-80">{color.hex}</span>
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            aria-hidden="true"
          >
            {copied ? (
              <Check className="w-3 h-3" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </span>
        </div>
      </div>
    </button>
  )
}
