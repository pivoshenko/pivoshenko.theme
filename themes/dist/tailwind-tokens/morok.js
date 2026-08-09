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
