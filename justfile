# Hosted lib.less gists imported by every userstyle. The morok bundle ships the
# stock URL; non-morok flavors rewrite it to their own gist.
morok_lib_url := "https://gist.githubusercontent.com/pivoshenko/a4b48bfdc60be6a6a35ea5f3da732be1/raw/2ed629b85e99708d1a937d945b9c255295c1e6ac/lib.less"
popil_lib_url := "https://gist.githubusercontent.com/pivoshenko/ee8090a682bb964031d51705d9ffd697/raw/cf6ade021565f51e1bcbcd258103bf3d363b3d0a/popil.less"
vatra_lib_url := "https://gist.githubusercontent.com/pivoshenko/4966a9fda130dbd531f9884c11ae156b/raw/1d138395cc167536d5fa2f40f6c0135fb604136d/vatra.less"

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

audit: audit-py audit-next

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

audit-py:
    uv audit

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

audit-next:
    pnpm -C site audit

update-next:
    pnpm -C site update

render: render-morok render-popil render-vatra

render-morok:
    uv run scripts/render.py --palette themes/palettes/morok.json
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/morok.json

render-popil:
    uv run scripts/render.py --palette themes/palettes/popil.json
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/popil.json --rewrite-import "{{ morok_lib_url }}" "{{ popil_lib_url }}"

render-vatra:
    uv run scripts/render.py --palette themes/palettes/vatra.json
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/vatra.json --rewrite-import "{{ morok_lib_url }}" "{{ vatra_lib_url }}"

clean:
    rm -rf themes/dist
