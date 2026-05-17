export type RGB = { r: number; g: number; b: number }

export function hexToRgb(hex: string): RGB | null {
  const normalized = hex.trim().replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null
  }
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  }
}

export function rgbToHslString({ r, g, b }: RGB): string {
  const rN = r / 255
  const gN = g / 255
  const bN = b / 255
  const max = Math.max(rN, gN, bN)
  const min = Math.min(rN, gN, bN)
  const delta = max - min
  let h = 0
  const l = (max + min) / 2
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  if (delta !== 0) {
    if (max === rN) {
      h = ((gN - bN) / delta) % 6
    } else if (max === gN) {
      h = (bN - rN) / delta + 2
    } else {
      h = (rN - gN) / delta + 4
    }
    h = Math.round(h * 60)
    if (h < 0) h += 360
  }
  return `${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}
