export function Hero() {
  return (
    <section className="space-y-4">
      <p className="type-body fg-body">
        <a
          href="https://github.com/pivoshenko/pivoshenko.theme"
          className="underline decoration-current/40 hover:decoration-current underline-offset-2 transition-colors"
          style={{ color: '#c7b07a' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Themes
        </a>{' '}
        focused on minimalism, simplicity and cross-tool consistency, shipped in
        three flavors:
      </p>
      <ul className="type-body fg-body space-y-1 list-disc pl-5">
        <li>
          <strong>Morok</strong> — pitch black, neutral greys on a true-black
          floor.
        </li>
        <li>
          <strong>Popil</strong> — warm ash. Near-neutral warm-grey base with
          neutral warm-grey subtext and muted terracotta accents.
        </li>
        <li>
          <strong>Vatra</strong> — Carpathian hearth fire. Same warm base as
          popil, but with golden-tan subtext and gruvbox-material-warm accents.
        </li>
      </ul>
      <p className="type-body fg-body">
        All three flavors share the same 14 named color slots and every port —
        only the values diverge. Pick <code className="font-mono">morok</code>{' '}
        for maximum contrast, <code className="font-mono">popil</code> for
        restrained warm minimalism, <code className="font-mono">vatra</code> for
        the gruvbox-coded sibling.
      </p>
    </section>
  )
}
