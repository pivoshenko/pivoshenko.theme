'use client'

import type { PaletteColor } from '@/lib/theme-data'
import { Copy } from 'lucide-react'
import { useState } from 'react'

type Props = {
  colors: PaletteColor[]
}

type RGB = {
  r: number
  g: number
  b: number
}

export function PaletteExplorer({ colors }: Props) {
  const [copied, setCopied] = useState<string>('')

  const onCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      setTimeout(() => setCopied(''), 1200)
    } catch {
      setCopied('')
    }
  }

  return (
    <section className="space-y-4">
      <h2 className="type-heading fg-primary">Colors</h2>

      <div className="overflow-x-auto rounded border border-ui bg-white dark:bg-stone-950">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-ui">
              <th className="text-left px-3 py-2 type-label fg-muted">Color</th>
              <th className="text-left px-3 py-2 type-label fg-muted">Hex</th>
              <th className="text-left px-3 py-2 type-label fg-muted">RGB</th>
              <th className="text-left px-3 py-2 type-label fg-muted">HSL</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color) => {
              const rgb = hexToRgb(color.hex)
              const rgbValue = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '-'
              const hslValue = rgb ? rgbToHslString(rgb) : '-'

              return (
                <tr
                  key={color.name}
                  className="border-b border-faint last:border-b-0"
                >
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full border border-ui"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="type-ui fg-primary">{color.name}</span>
                      <CopyButton
                        value={color.name}
                        copied={copied === color.name}
                        onCopy={onCopy}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <ValueCell
                      value={color.hex}
                      copied={copied === color.hex}
                      onCopy={onCopy}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <ValueCell
                      value={rgbValue}
                      copied={copied === rgbValue}
                      onCopy={onCopy}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <ValueCell
                      value={hslValue}
                      copied={copied === hslValue}
                      onCopy={onCopy}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ValueCell({
  value,
  copied,
  onCopy,
}: {
  value: string
  copied: boolean
  onCopy: (value: string) => void
}) {
  const canCopy = value !== '-'

  return (
    <div className="inline-flex items-center gap-2">
      <span className="type-ui fg-secondary">{value}</span>
      <CopyButton
        value={value}
        copied={copied}
        onCopy={onCopy}
        disabled={!canCopy}
      />
    </div>
  )
}

function CopyButton({
  value,
  copied,
  onCopy,
  disabled = false,
}: {
  value: string
  copied: boolean
  onCopy: (value: string) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(value)}
      disabled={disabled}
      aria-label={copied ? 'Copied' : 'Copy value'}
      className={`inline-flex items-center rounded border border-ui p-1 transition-colors disabled:opacity-40 disabled:hover:text-inherit ${
        copied
          ? 'text-green-600 dark:text-green-400'
          : 'fg-muted hover-secondary'
      }`}
    >
      <Copy aria-hidden="true" className="w-3 h-3" />
    </button>
  )
}

function hexToRgb(hex: string): RGB | null {
  const normalized = hex.trim().replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null
  }

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  }
}

function rgbToHslString({ r, g, b }: RGB): string {
  const rN = r / 255
  const gN = g / 255
  const bN = b / 255

  const max = Math.max(rN, gN, bN)
  const min = Math.min(rN, gN, bN)
  const delta = max - min

  let h = 0
  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  if (delta !== 0) {
    if (max === rN) {
      h = ((gN - bN) / delta) % 6
    } else if (max === gN) {
      h = (bN - rN) / delta + 2
    } else {
      h = (rN - gN) / delta + 4
    }
    h = Math.round(h * 60)
    if (h < 0) {
      h += 360
    }
  }

  return `${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
