import { createOgImage } from 'pivoshenko.ui/next/opengraph-image'

export const alt = 'pivoshenko.theme'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default createOgImage({
  brand: 'Volodymyr Pivoshenko',
  title: 'Themes',
  subtitle:
    'Dark themes in three flavors - Morok, Popil and Vatra - focused on minimalism and cross-tool consistency',
  domain: 'theme.pivoshenko.dev',
  accent: 'red',
})
