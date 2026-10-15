import { setDefaultAutoSelectFamilyAttemptTimeout } from 'node:net'
import { createOgImage } from 'pivoshenko.ui/next/opengraph-image'

export const alt = 'pivoshenko.theme'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// see the note in icon.tsx: without this the build-time font fetch gets only
// happy-eyeballs' 250ms on IPv4 and fails as ETIMEDOUT on an IPv6-less runner
setDefaultAutoSelectFamilyAttemptTimeout(5000)

export default createOgImage({
  brand: 'Volodymyr Pivoshenko',
  title: 'Themes',
  subtitle:
    'Dark themes in three flavors - Morok, Popil and Vatra - focused on minimalism and cross-tool consistency',
  domain: 'theme.pivoshenko.dev',
  accent: 'red',
})
