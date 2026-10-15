import { setDefaultAutoSelectFamilyAttemptTimeout } from 'node:net'
import Icon from 'pivoshenko.ui/next/icon'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

// the CI runner has no IPv6 route, so happy-eyeballs burns its first attempt
// on an ENETUNREACH and gives the IPv4 address only the remaining 250ms, which
// the build worker does not always meet - the font fetch inside the component
// then dies as ETIMEDOUT and takes the prerender with it
setDefaultAutoSelectFamilyAttemptTimeout(5000)

// wrapped rather than re-exported, so the mark's chip matches the site accent
export default function SiteIcon() {
  return Icon({ accent: 'red' })
}
