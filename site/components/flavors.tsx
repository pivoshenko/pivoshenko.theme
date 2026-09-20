import type { PaletteData } from '@/lib/flavor-context'
import { FLAVORS, type Flavor } from '@/lib/flavors'
import { FlameKindling, Haze, type LucideIcon, Moon } from 'lucide-react'

type FlavorsProps = {
  palettes: Record<Flavor, PaletteData>
}

// The ramp reads left to right from the darkest surface to the lightest text,
// which is the one axis the three flavors actually differ on at a glance
const ramp = ['crust', 'mantle', 'base', 'surface0', 'surface2', 'text']

// One fire, three moments of it: unlit, smouldering, burning
const icons: Record<Flavor, LucideIcon> = {
  morok: Moon,
  popil: Haze,
  vatra: FlameKindling,
}

export function Flavors({ palettes }: FlavorsProps) {
  return (
    <div className="space-y-10 pt-2">
      {FLAVORS.map((flavor, index) => {
        const palette = palettes[flavor.id]
        const Icon = icons[flavor.id]
        // the whole row alternates sides, mark and all, so the eye zigzags
        // down the three. Keeping the row narrower than the page is what makes
        // that read - a full-bleed row has no side to sit on
        const flip = index % 2 === 1

        return (
          <article
            key={flavor.id}
            className={`flex max-w-3xl flex-col items-start gap-6 sm:items-start sm:gap-8 ${
              flip
                ? 'ml-auto sm:flex-row-reverse sm:text-right'
                : 'mr-auto sm:flex-row'
            }`}
          >
            <Icon
              size={56}
              strokeWidth={1.5}
              aria-hidden="true"
              className="mt-1 flex-none text-accent"
            />

            <div className="min-w-0 flex-1">
              <h3 className="type-display fg-title text-lg">{flavor.name}</h3>
              <p className="type-meta fg-subtle mt-1">
                [{flavor.say}] <span aria-hidden="true">&middot;</span> from
                Ukrainian, which means &quot;{flavor.means}&quot;
              </p>
              <p className="type-body fg-body mt-3">{flavor.blurb}</p>
              <div className="mt-5 space-y-1.5">
                <Strip
                  label={`${flavor.name} surface ramp`}
                  slots={ramp.map((slot) => ({
                    name: slot,
                    hex: palette.map[slot],
                  }))}
                />
                <Strip
                  label={`${flavor.name} accents`}
                  slots={palette.colors.filter((c) => c.group === 'accent')}
                />
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

type StripProps = {
  label: string
  slots: Array<{ name: string; hex: string }>
}

function Strip({ label, slots }: StripProps) {
  return (
    <div
      aria-label={label}
      className="flex h-7 overflow-hidden rounded-sm border border-faint"
    >
      {slots.map((slot) => (
        <span
          key={slot.name}
          aria-hidden="true"
          style={{ backgroundColor: slot.hex }}
          className="flex-1"
        />
      ))}
    </div>
  )
}
