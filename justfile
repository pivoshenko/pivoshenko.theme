format: format-py format-next

lint: lint-py lint-next

update: update-py update-next

format-py:
    find scripts -type f -name '*.py' | xargs uv run pyupgrade --py313-plus
    uv run ruff format .

lint-py:
    uv run ty check .
    uv run ruff check .

update-py:
    uv lock --upgrade
    uvx uv-upsync

dev-next:
    cd site && pnpm dev

format-next:
    cd site && pnpm format

lint-next:
    cd site && pnpm check
    cd site && pnpm build

update-next:
    cd site && pnpm update

render: render-morok render-popil

render-morok:
    uv run scripts/render.py --palette themes/palettes/morok.json
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/morok.json

render-popil:
    uv run scripts/render.py --palette themes/palettes/popil.json

clean:
    rm -rf themes/dist
