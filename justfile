morok_lib_url := "https://gist.githubusercontent.com/pivoshenko/a4b48bfdc60be6a6a35ea5f3da732be1/raw/2ed629b85e99708d1a937d945b9c255295c1e6ac/lib.less"
popil_lib_url := "https://gist.githubusercontent.com/pivoshenko/ee8090a682bb964031d51705d9ffd697/raw/cf6ade021565f51e1bcbcd258103bf3d363b3d0a/popil.less"
vatra_lib_url := "https://gist.githubusercontent.com/pivoshenko/4966a9fda130dbd531f9884c11ae156b/raw/1d138395cc167536d5fa2f40f6c0135fb604136d/vatra.less"

default:
    @just --list

install: install-py install-site

install-py:
    uv sync --all-groups --all-extras

install-site:
    cd site && pnpm install

format: format-py format-site

format-py:
    uv run ruff check --fix .
    uv run ruff format .

format-site:
    cd site && pnpm format

lint: lint-py lint-site

lint-py:
    uv run ruff check .
    uv run ty check .

lint-site:
    cd site && pnpm lint
    cd site && pnpm typecheck

test: test-py test-site

test-py:
    @[ -f .no-tests ] && echo "skipping (.no-tests sentinel)" || { echo "no test command, add tests or restore .no-tests" >&2; exit 1; }

test-site:
    @cd site && ([ -f .no-tests ] && echo "skipping (.no-tests sentinel)" || { echo "no test command, add tests or restore .no-tests" >&2; exit 1; })

check: lint test build

update: update-py update-site

update-py:
    uv lock --upgrade
    uvx uv-upsync

update-site:
    cd site && pnpm update

build: build-site render-themes

build-site:
    cd site && pnpm build

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

run-dev-server:
    cd site && pnpm dev

run-prod-server: build-site
    cd site && pnpm start
