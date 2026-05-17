type Props = {
  accents: { name: string; hex: string }[]
}

export function Hero({ accents: _accents }: Props) {
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
          Morok
        </a>{' '}
        — a theme focused on minimalism, simplicity, and cross-tool consistency.
      </p>
      <p className="type-body fg-body">
        <em>Morok</em> (pronounced [mo-rok]) is a Ukrainian word that means
        “darkness” or “gloom”. It is often used to describe a state of
        melancholy, sadness, or despair, and can also refer to a dark and gloomy
        atmosphere or environment.
      </p>
    </section>
  )
}
