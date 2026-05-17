import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { JetBrains_Mono } from 'next/font/google'
import { PageShell } from 'pivoshenko.ui'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://theme.pivoshenko.dev'),
  title: {
    template: '%s — pivoshenko.theme',
    default: 'pivoshenko.theme — morok',
  },
  description:
    'Morok — a theme focused on minimalism, simplicity, and cross-tool consistency. Palette and ports explorer.',
  icons: {
    icon: '/icon',
  },
  openGraph: {
    type: 'website',
    url: 'https://theme.pivoshenko.dev',
    siteName: 'pivoshenko.theme',
    title: 'pivoshenko.theme — morok',
    description:
      'Morok — a theme focused on minimalism, simplicity, and cross-tool consistency. Palette and ports explorer.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pivoshenko.theme — morok',
    description:
      'Morok — a theme focused on minimalism, simplicity, and cross-tool consistency.',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body className="bg-stone-50 text-stone-900 dark:bg-black dark:text-stone-100 font-mono antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageShell brand="pivoshenko.theme">{children}</PageShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
