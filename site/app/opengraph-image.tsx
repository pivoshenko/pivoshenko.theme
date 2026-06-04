import { createOgImage } from 'pivoshenko.ui/next/opengraph-image'

export const alt = 'Morok • Popil • Vatra'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const runtime = 'edge'

export default createOgImage({
  brand: 'pivoshenko.theme',
  title: 'Morok • Popil • Vatra',
  subtitle:
    'Themes focused on minimalism, simplicity and cross-tool consistency',
  domain: 'theme.pivoshenko.dev',
})
