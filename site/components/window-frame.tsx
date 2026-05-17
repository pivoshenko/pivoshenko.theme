'use client'

import type { ReactNode } from 'react'

type Props = {
  title: string
  chromeBg: string
  chromeFg: string
  dotColors: [string, string, string]
  right?: ReactNode
  children: ReactNode
}

export function WindowFrame({
  title,
  chromeBg,
  chromeFg,
  dotColors,
  right,
  children,
}: Props) {
  return (
    <div className="rounded-xl border border-ui overflow-hidden">
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ background: chromeBg, color: chromeFg }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: dotColors[0] }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: dotColors[1] }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: dotColors[2] }}
          />
        </div>
        <span className="font-mono text-xs">{title}</span>
        <div className="min-w-[80px] flex justify-end">{right}</div>
      </div>
      {children}
    </div>
  )
}
