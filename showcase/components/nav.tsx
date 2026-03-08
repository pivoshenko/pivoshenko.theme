'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

const tabs = [
  { href: '/colors', label: 'Colors' },
  { href: '/ports', label: 'Ports' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b border-ui">
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/colors"
          className="type-logo fg-primary hover:opacity-60 transition-opacity"
        >
          pivoshenko.theme
        </Link>

        <div className="flex items-center">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href)
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`type-ui px-3 py-1.5 rounded transition-colors ${
                  isActive ? 'fg-primary' : 'fg-subtle hover-primary'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
          <div className="ml-1 pl-1 border-l border-ui">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
