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
    titleTemplate: '%s — pivoshenko.theme',
    description:
      'Themes focused on minimalism, simplicity and cross-tool consistency',
  }),
  authors: [{ name: 'Volodymyr Pivoshenko', url: 'https://pivoshenko.dev' }],
  creator: 'Volodymyr Pivoshenko',
  icons: { icon: '/icon' },
  alternates: { canonical: '/' },
}

export const viewport = siteViewport

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SiteLayout brand="pivoshenko.theme">{children}</SiteLayout>
}
