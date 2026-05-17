type ThemeRegistration = Record<string, unknown>

type TokenRule = {
  scope: string | string[]
  settings: { foreground?: string; fontStyle?: string }
}

function tokens(
  palette: Record<string, string>,
  comment: string,
  punct: string,
  fg: string,
): TokenRule[] {
  return [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: comment, fontStyle: 'italic' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier'],
      settings: { foreground: palette.mauve },
    },
    {
      scope: [
        'keyword.control',
        'keyword.control.import',
        'keyword.control.from',
        'keyword.control.flow',
      ],
      settings: { foreground: palette.mauve },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'punctuation.definition.string',
        'string.template',
      ],
      settings: { foreground: palette.green },
    },
    { scope: ['string.regexp'], settings: { foreground: palette.pink } },
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.language.boolean',
      ],
      settings: { foreground: palette.peach },
    },
    {
      scope: ['constant.character.escape'],
      settings: { foreground: palette.pink },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call',
        'meta.function-call entity.name.function',
      ],
      settings: { foreground: palette.blue },
    },
    {
      scope: [
        'entity.name.type',
        'support.type',
        'support.class',
        'storage.type.class',
        'entity.name.class',
      ],
      settings: { foreground: palette.yellow },
    },
    {
      scope: ['entity.name.tag', 'support.class.component'],
      settings: { foreground: palette.blue },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: palette.yellow },
    },
    {
      scope: [
        'variable',
        'meta.definition.variable',
        'variable.other.readwrite',
      ],
      settings: { foreground: fg },
    },
    {
      scope: ['variable.parameter'],
      settings: { foreground: palette.maroon, fontStyle: 'italic' },
    },
    {
      scope: ['variable.other.constant'],
      settings: { foreground: palette.peach },
    },
    {
      scope: [
        'variable.language',
        'variable.language.this',
        'variable.language.self',
      ],
      settings: { foreground: palette.red, fontStyle: 'italic' },
    },
    {
      scope: [
        'variable.other.member',
        'meta.object.member',
        'meta.property.object',
      ],
      settings: { foreground: palette.blue },
    },
    {
      scope: [
        'punctuation',
        'punctuation.separator',
        'punctuation.terminator',
        'punctuation.section',
      ],
      settings: { foreground: punct },
    },
    {
      scope: [
        'operator',
        'keyword.operator',
        'keyword.operator.assignment',
        'keyword.operator.arithmetic',
      ],
      settings: { foreground: palette.sky },
    },
    {
      scope: ['meta.tag', 'punctuation.definition.tag'],
      settings: { foreground: punct },
    },
    {
      scope: ['markup.heading'],
      settings: { foreground: palette.mauve, fontStyle: 'bold' },
    },
    {
      scope: ['markup.bold'],
      settings: { foreground: palette.peach, fontStyle: 'bold' },
    },
    {
      scope: ['markup.italic'],
      settings: { foreground: palette.pink, fontStyle: 'italic' },
    },
    {
      scope: ['markup.inline.raw', 'markup.fenced_code'],
      settings: { foreground: palette.green },
    },
    {
      scope: ['markup.underline.link'],
      settings: { foreground: palette.sapphire },
    },
    {
      scope: [
        'support.type.property-name',
        'meta.object-literal.key',
        'meta.mapping.key string',
      ],
      settings: { foreground: palette.blue },
    },
  ]
}

export function morokShikiTheme(
  palette: Record<string, string>,
): ThemeRegistration {
  return {
    name: 'morok',
    type: 'dark',
    fg: palette.text,
    bg: palette.base,
    colors: {
      'editor.background': palette.base,
      'editor.foreground': palette.text,
      'editorLineNumber.foreground': palette.overlay0,
      'editorCursor.foreground': palette.mauve,
      'editor.selectionBackground': `${palette.surface1}cc`,
    },
    tokenColors: tokens(
      palette,
      palette.overlay2,
      palette.overlay2,
      palette.text,
    ),
  }
}
