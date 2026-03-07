# pivoshenko.theme

A private, template-driven theme system inspired by Catppuccin workflow.

Goal: keep one source palette and generate consistent themes for multiple tools.

## Included tools (v1)

- Ghostty
- Delta
- Starship palette block

## Structure

- `palettes/*.json` - Catppuccin-compatible semantic color tokens (rosewater..crust)
- `templates/*` - tool templates with token placeholders
- `scripts/render.py` - generator
- `dist/` - generated outputs

## Generate

```bash
python3 scripts/render.py --palette palettes/pivoshenko-night.json
```

## Why this approach

Like Catppuccin's mako/whiskers pipeline: templates are stable, colors are swapped from a single palette. This keeps ports maintainable and consistent.

## Next ports

- bat
- bottom
- k9s
- lazygit
- zed
