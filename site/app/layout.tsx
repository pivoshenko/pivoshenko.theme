import { SpeedInsights } from '@vercel/speed-insights/next'
import {
  SiteLayout,
  siteMetadata,
  siteViewport,
} from 'pivoshenko.ui/next/site-layout'
import './globals.css'

export const metadata = {
  ...siteMetadata({
    url: 'https://theme.pivoshenko.dev',
    brand: 'pivoshenko.theme',
    title: 'Morok • Popil • Vatra',
    titleTemplate: '%s - pivoshenko.theme',
    description:
      'Themes focused on minimalism, simplicity and cross-tool consistency',
  }),
  authors: [{ name: 'Volodymyr Pivoshenko', url: 'https://pivoshenko.dev' }],
  creator: 'Volodymyr Pivoshenko',
  icons: { icon: '/icon' },
  alternates: { canonical: '/' },
}

export const viewport = siteViewport

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/ports', label: 'Ports' },
  { href: '/palette', label: 'Palette' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SiteLayout
      brand="pivoshenko.theme"
      accent="red"
      subAccent="peach"
      navLinks={navLinks}
      field="waves"
      fieldTintAlt="peach"
      afterShell={<SpeedInsights />}
    >
      {children}
    </SiteLayout>
  )
}
