default:
    @just --list

install:
    uv sync
    pnpm -C site install

dev:
    pnpm -C site dev

format: format-py format-next

lint: lint-py lint-next

check: check-py check-next

# Theme's build artifact is the rendered ports
build: render

start:
    pnpm -C site build
    pnpm -C site start

update: update-py update-next

format-py:
    find scripts -type f -name '*.py' | xargs uv run pyupgrade --py313-plus
    uv run ruff format .

lint-py:
    uv run ruff check .
    uv run ty check .

check-py: lint-py

update-py:
    uv lock --upgrade
    uvx uv-upsync

format-next:
    pnpm -C site format

lint-next:
    pnpm -C site lint

check-next:
    pnpm -C site check
    pnpm -C site build

update-next:
    pnpm -C site update

render: render-morok render-popil

render-morok:
    uv run scripts/render.py --palette themes/palettes/morok.json
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/morok.json

render-popil:
    uv run scripts/render.py --palette themes/palettes/popil.json

clean:
    rm -rf themes/dist
