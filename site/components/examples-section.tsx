'use client'

import { useFlavor } from '@/lib/flavor-context'
import { Tab, Tabs } from 'pivoshenko.ui'
import { useState } from 'react'
import { TerminalPreview } from './terminal-preview'
import { WindowFrame } from './window-frame'

export type CodeExample = {
  id: string
  label: string
  language: string
  filename: string
  html: string
}

type Props = {
  examples: CodeExample[]
  palette: Record<string, string>
}

const blockClass =
  'shiki-host text-[13px] overflow-x-auto [&>pre]:p-4 [&>pre]:m-0 [&>pre]:font-mono [&>pre]:leading-relaxed [&_code]:font-mono'

export function ExamplesSection({ examples, palette }: Props) {
  const { flavor } = useFlavor()
  const [active, setActive] = useState('terminal')
  const current = examples.find((e) => e.id === active)

  return (
    <div className="space-y-3">
      <Tabs className="overflow-x-auto">
        <Tab
          active={active === 'terminal'}
          onClick={() => setActive('terminal')}
        >
          terminal
        </Tab>
        {examples.map((e) => (
          <Tab
            key={e.id}
            active={active === e.id}
            onClick={() => setActive(e.id)}
          >
            {e.label}
          </Tab>
        ))}
      </Tabs>

      {active === 'terminal' ? (
        <TerminalPreview palette={palette} />
      ) : current ? (
        <WindowFrame
          title={`${flavor} — ${current.language}`}
          chromeBg={palette.mantle}
          chromeFg={palette.subtext0}
          dotColors={[palette.red, palette.yellow, palette.green]}
          right={
            <span className="font-mono text-[10px] opacity-70">
              {current.filename}
            </span>
          }
        >
          <div
            className={blockClass}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output is trusted.
            dangerouslySetInnerHTML={{ __html: current.html }}
          />
        </WindowFrame>
      ) : null}
    </div>
  )
}
