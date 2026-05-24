# Hosted lib.less gists imported by every userstyle. The morok bundle ships the
# stock URL; popil rewrites it to its own gist (raw URL of themes/userstyles/lib/popil.less).
morok_lib_url := "https://gist.githubusercontent.com/pivoshenko/a4b48bfdc60be6a6a35ea5f3da732be1/raw/f0a66b5138c45dd5fb91e7fa42b601f2a6b890d6/lib.less"
popil_lib_url := "https://gist.githubusercontent.com/pivoshenko/ee8090a682bb964031d51705d9ffd697/raw/ee1e096ab4a3daef746bf0a4b2b4272edf3f23b4/popil.less"

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
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/popil.json --rewrite-import "{{ morok_lib_url }}" "{{ popil_lib_url }}"

clean:
    rm -rf themes/dist
