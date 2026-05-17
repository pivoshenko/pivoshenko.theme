'use client'

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type AccentEntry = { name: string; hex: string }

type AccentContextValue = {
  accents: AccentEntry[]
  pinned: AccentEntry | null
  pin: (entry: AccentEntry | null) => void
  copy: (value: string) => Promise<void>
  copied: string
}

const AccentContext = createContext<AccentContextValue | null>(null)

export function AccentProvider({
  accents,
  defaultAccent,
  children,
}: {
  accents: AccentEntry[]
  defaultAccent: string
  children: ReactNode
}) {
  const initial = useMemo(
    () => accents.find((a) => a.name === defaultAccent) ?? accents[0] ?? null,
    [accents, defaultAccent],
  )
  const [pinned, setPinned] = useState<AccentEntry | null>(initial)
  const [copied, setCopied] = useState('')

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      setTimeout(() => setCopied(''), 1200)
    } catch {
      setCopied('')
    }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return

      if (e.key === 'c' && pinned) {
        e.preventDefault()
        void copy(pinned.hex)
      } else if (e.key === 'n' && pinned) {
        e.preventDefault()
        void copy(pinned.name)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (!pinned) return
        const idx = accents.findIndex((a) => a.name === pinned.name)
        if (idx < 0) return
        const next =
          e.key === 'ArrowRight'
            ? accents[(idx + 1) % accents.length]
            : accents[(idx - 1 + accents.length) % accents.length]
        if (next) {
          e.preventDefault()
          setPinned(next)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [accents, pinned, copy])

  const value = useMemo(
    () => ({ accents, pinned, pin: setPinned, copy, copied }),
    [accents, pinned, copy, copied],
  )

  return (
    <AccentContext.Provider value={value}>
      <div
        style={
          {
            '--morok-pinned': pinned?.hex ?? '#a78cc4',
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </AccentContext.Provider>
  )
}

export function useAccent(): AccentContextValue {
  const ctx = useContext(AccentContext)
  if (!ctx) {
    throw new Error('useAccent must be used within AccentProvider')
  }
  return ctx
}
