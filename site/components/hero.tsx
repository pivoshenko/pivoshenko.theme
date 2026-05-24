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
          A dark theme
        </a>{' '}
        focused on minimalism, simplicity and cross-tool consistency, shipped in
        two flavors:
      </p>
      <ul className="type-body fg-body space-y-1 list-disc pl-5">
        <li>
          <strong>Morok</strong> features pitch black — neutral greys on a
          true-black floor.
        </li>
        <li>
          <strong>Popil</strong> features warm ash — the same palette lifted off
          black with a warm tint.
        </li>
      </ul>
      <p className="type-body fg-body">
        Both flavors share identical accents, neutrals, and ports — only the
        background ramp differs (cold black vs warm). Pick{' '}
        <code className="font-mono">morok</code> for maximum contrast,{' '}
        <code className="font-mono">popil</code> for a softer, warmer dark.
      </p>
    </section>
  )
}
