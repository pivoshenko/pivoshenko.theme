format: format-py format-next

lint: lint-py lint-next

update: update-py update-next

format-py:
  find scripts -type f -name '*.py' | xargs uv run pyupgrade --py313-plus
  uv run ruff format .

lint-py:
  uv run ty check .
  uv run ruff check .
  uv run cz check --rev-range .

update-py:
  uv lock --upgrade
  uvx uv-upsync

format-next:
  cd showcase && pnpm format

lint-next:
  cd showcase && pnpm check
  cd showcase && pnpm build

update-next:
  cd showcase && pnpm update

render:
  uv run scripts/render.py --palette palettes/morok.json
  uv run scripts/bundle.py
