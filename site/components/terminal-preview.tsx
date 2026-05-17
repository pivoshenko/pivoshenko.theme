'use client'

import { useAccent } from '@/lib/accent-context'
import { WindowFrame } from './window-frame'

type Props = {
  palette: Record<string, string>
}

export function TerminalPreview({ palette }: Props) {
  const { pinned } = useAccent()

  const bg = palette.base
  const chrome = palette.mantle
  const fg = palette.text
  const dim = palette.subtext0
  const punct = palette.overlay2
  const accent = pinned?.hex ?? palette.mauve

  const symbols = {
    arrow: '❯',
    check: '✓',
    cross: '✗',
    plus: '+',
    pencil: '✎',
    dot: '●',
  }

  return (
    <WindowFrame
      title="morok — fish"
      chromeBg={chrome}
      chromeFg={dim}
      dotColors={[palette.red, palette.yellow, palette.green]}
    >
      <div
        className="p-4 font-mono text-[13px] leading-relaxed"
        style={{ background: bg, color: fg }}
      >
        <Prompt
          palette={palette}
          accent={accent}
          dir="~/dev/morok"
          branch="main"
          symbols={symbols}
        >
          <span style={{ color: palette.sky }}>git</span>{' '}
          <span style={{ color: palette.peach }}>checkout</span>{' '}
          <span style={{ color: palette.peach }}>-b</span>{' '}
          <span style={{ color: palette.green }}>feat/lavender-accent</span>
        </Prompt>
        <div style={{ color: dim }}>
          Switched to a new branch{' '}
          <span style={{ color: palette.green }}>'feat/lavender-accent'</span>
        </div>

        <Prompt
          palette={palette}
          accent={accent}
          dir="~/dev/morok"
          branch="feat/lavender-accent"
          symbols={symbols}
        >
          <span style={{ color: palette.sky }}>git</span>{' '}
          <span style={{ color: palette.peach }}>status</span>{' '}
          <span style={{ color: palette.peach }}>--short</span>
        </Prompt>
        <div className="py-0.5">
          <div>
            <span style={{ color: palette.green }}>M </span>
            <span style={{ color: palette.subtext1 }}>
              morok/palettes/morok.json
            </span>
          </div>
          <div>
            <span style={{ color: palette.yellow }}>M </span>
            <span style={{ color: palette.subtext1 }}>
              morok/templates/helix/theme.toml.jinja
            </span>
          </div>
          <div>
            <span style={{ color: palette.red }}>?? </span>
            <span style={{ color: palette.subtext1 }}>
              scripts/sync-lavender.py
            </span>
          </div>
        </div>

        <Prompt
          palette={palette}
          accent={accent}
          dir="~/dev/morok"
          branch="feat/lavender-accent"
          symbols={symbols}
        >
          <span style={{ color: palette.sky }}>bat</span>{' '}
          <span style={{ color: palette.peach }}>--style=numbers</span>{' '}
          <span style={{ color: palette.green }}>
            morok/palettes/morok.json
          </span>
        </Prompt>
        <div className="py-0.5" style={{ color: punct }}>
          <div className="flex gap-2">
            <span style={{ color: dim, width: '1.5rem', textAlign: 'right' }}>
              1
            </span>
            <span style={{ color: punct }}>{'{'}</span>
          </div>
          <div className="flex gap-2">
            <span style={{ color: dim, width: '1.5rem', textAlign: 'right' }}>
              2
            </span>
            <div>
              <span style={{ paddingLeft: '0.5rem' }} />
              <span style={{ color: palette.blue }}>"name"</span>
              <span style={{ color: punct }}>: </span>
              <span style={{ color: palette.green }}>"morok"</span>
              <span style={{ color: punct }}>,</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span style={{ color: dim, width: '1.5rem', textAlign: 'right' }}>
              3
            </span>
            <div>
              <span style={{ paddingLeft: '0.5rem' }} />
              <span style={{ color: palette.blue }}>"flavor"</span>
              <span style={{ color: punct }}>: </span>
              <span style={{ color: palette.green }}>"dark"</span>
              <span style={{ color: punct }}>,</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span style={{ color: dim, width: '1.5rem', textAlign: 'right' }}>
              4
            </span>
            <div>
              <span style={{ paddingLeft: '0.5rem' }} />
              <span style={{ color: palette.blue }}>"colors"</span>
              <span style={{ color: punct }}>: {'{'}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span style={{ color: dim, width: '1.5rem', textAlign: 'right' }}>
              5
            </span>
            <div>
              <span style={{ paddingLeft: '1rem' }} />
              <span style={{ color: palette.blue }}>"mauve"</span>
              <span style={{ color: punct }}>: </span>
              <span style={{ color: palette.green }}>"{palette.mauve}"</span>
              <span style={{ color: punct }}>,</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span style={{ color: dim, width: '1.5rem', textAlign: 'right' }}>
              6
            </span>
            <div>
              <span style={{ paddingLeft: '1rem' }} />
              <span style={{ color: palette.blue }}>"lavender"</span>
              <span style={{ color: punct }}>: </span>
              <span style={{ color: palette.green }}>"{palette.lavender}"</span>
            </div>
          </div>
        </div>

        <Prompt
          palette={palette}
          accent={accent}
          dir="~/dev/morok"
          branch="feat/lavender-accent"
          symbols={symbols}
        >
          <span style={{ color: palette.sky }}>just</span>{' '}
          <span style={{ color: palette.peach }}>render</span>
        </Prompt>
        <div style={{ color: palette.green }}>
          {symbols.check} rendered 21 ports in 142ms
        </div>
      </div>
    </WindowFrame>
  )
}

type Symbols = {
  arrow: string
  check: string
  cross: string
  plus: string
  pencil: string
  dot: string
}

function Prompt({
  palette,
  accent,
  dir,
  branch,
  symbols,
  children,
}: {
  palette: Record<string, string>
  accent: string
  dir: string
  branch: string
  symbols: Symbols
  children: React.ReactNode
}) {
  return (
    <div className="whitespace-pre-wrap">
      <span style={{ color: palette.blue }}>{dir}</span>{' '}
      <span style={{ color: palette.green }}>({branch})</span>{' '}
      <span style={{ color: accent }}>{symbols.arrow}</span> {children}
    </div>
  )
}
