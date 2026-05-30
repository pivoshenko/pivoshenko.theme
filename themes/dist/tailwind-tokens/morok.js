/**
 * pivoshenko.theme — flavor-agnostic Tailwind preset (role layer)
 *
 * Consumes the CSS variables emitted by `tokens/<flavor>.css`. Import the
 * tokens CSS for each flavor in your global stylesheet and set
 * `data-flavor` on the root element to switch.
 *
 *   import 'pivoshenko.theme/tokens/morok.css'
 *   import 'pivoshenko.theme/tokens/popil.css'
 *
 * The output of this preset is IDENTICAL for every palette — it only
 * references variables. Both `morok.js` and `popil.js` are written for
 * symmetry; consumers may import either.
 *
 * Generated from morok palette (dark).
 */
const withAlpha = (token) => `rgb(var(--${token}) / <alpha-value>)`

module.exports = {
  theme: {
    extend: {
      colors: {
        bg: {
          canvas: withAlpha('bg-canvas'),
          surface: withAlpha('bg-surface'),
          raised: withAlpha('bg-raised'),
          sunken: withAlpha('bg-sunken'),
          overlay: withAlpha('bg-overlay'),
        },
        fg: {
          DEFAULT: withAlpha('fg-default'),
          default: withAlpha('fg-default'),
          muted: withAlpha('fg-muted'),
          subtle: withAlpha('fg-subtle'),
          faint: withAlpha('fg-faint'),
        },
        border: {
          DEFAULT: withAlpha('border-default'),
          subtle: withAlpha('border-subtle'),
          default: withAlpha('border-default'),
          strong: withAlpha('border-strong'),
        },
        accent: {
          DEFAULT: withAlpha('accent-primary'),
          primary: withAlpha('accent-primary'),
          secondary: withAlpha('accent-secondary'),
          success: withAlpha('accent-success'),
          warning: withAlpha('accent-warning'),
          danger: withAlpha('accent-danger'),
          info: withAlpha('accent-info'),
        },
      },
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
}
