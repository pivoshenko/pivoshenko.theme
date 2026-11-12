morok_lib_url := "https://gist.githubusercontent.com/pivoshenko/a4b48bfdc60be6a6a35ea5f3da732be1/raw/de01ccf4193989fb3731e3eeac80111d3044f488/lib.less"
popil_lib_url := "https://gist.githubusercontent.com/pivoshenko/ee8090a682bb964031d51705d9ffd697/raw/d6643cabce8f204b7a7addf0a9596d3b4381823f/popil.less"
vatra_lib_url := "https://gist.githubusercontent.com/pivoshenko/4966a9fda130dbd531f9884c11ae156b/raw/28b6e1c661399de32e242c02af85d7116d375d1b/vatra.less"

default:
    @just --list

install: install-py

install-py:
    uv sync --all-groups --all-extras

format: format-py

format-py:
    uv run ruff check --fix .
    uv run ruff format .

lint: lint-py

lint-py:
    uv run ruff check .
    uv run ty check .

test: test-py

test-py:
    @[ -f .no-tests ] && echo "skipping (.no-tests sentinel)" || { echo "no test command, add tests or restore .no-tests" >&2; exit 1; }

check: lint test build

update: update-py

update-py:
    uv lock --upgrade
    uv run uv-upsync

build: render-themes

clean:
    rm -rf themes/dist

render-themes: render-theme-morok render-theme-popil render-theme-vatra

render-theme-morok:
    uv run scripts/render.py --palette themes/palettes/morok.json
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/morok.json

render-theme-popil:
    uv run scripts/render.py --palette themes/palettes/popil.json
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/popil.json --rewrite-import "{{ morok_lib_url }}" "{{ popil_lib_url }}"

render-theme-vatra:
    uv run scripts/render.py --palette themes/palettes/vatra.json
    uv run scripts/bundle.py --styles-dir themes/userstyles/styles --output themes/dist/stylus/vatra.json --rewrite-import "{{ morok_lib_url }}" "{{ vatra_lib_url }}"
