export function Hero() {
  return (
    <section className="space-y-4">
      <p className="type-body fg-body">
        <a
          href="https://github.com/pivoshenko/pivoshenko.theme"
          className="text-accent-primary underline decoration-accent-primary/40 hover:decoration-accent-primary underline-offset-2 transition-colors"
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
          <strong>Morok</strong> is darkness: the starkest of the three, coolest
          in tone, highest in contrast.
        </li>
        <li>
          <strong>Popil</strong> is ash: warm, muted and restrained.
        </li>
        <li>
          <strong>Vatra</strong> is hearth fire: the same warm base as popil,
          but punchier and more saturated.
        </li>
      </ul>
      <p className="type-body fg-body">
        All three flavors share the same 14 named color slots and every port.
        Only the values diverge.
      </p>
    </section>
  )
}
