'use client'

import { hexToRgb, rgbToHslString } from '@/lib/contrast'
import type { PaletteColor } from '@/lib/theme-data'
import { Copy } from 'lucide-react'
import { useState } from 'react'

type Props = {
  colors: PaletteColor[]
}

export function PaletteTable({ colors }: Props) {
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
