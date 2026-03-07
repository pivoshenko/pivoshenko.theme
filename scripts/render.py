#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = ROOT / "templates"
DIST = ROOT / "dist"


def _hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def _rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    return "#%02x%02x%02x" % rgb


def _blend(a: str, b: str, ratio_b: float) -> str:
    ar, ag, ab = _hex_to_rgb(a)
    br, bg, bb = _hex_to_rgb(b)
    ratio_a = 1.0 - ratio_b
    mixed = (
        round(ar * ratio_a + br * ratio_b),
        round(ag * ratio_a + bg * ratio_b),
        round(ab * ratio_a + bb * ratio_b),
    )
    return _rgb_to_hex(mixed)


def render_template(template: str, values: dict[str, str]) -> str:
    result = template
    for key, value in values.items():
        result = result.replace(f"{{{{{key}}}}}", str(value))
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description="Render theme files from palette JSON")
    parser.add_argument("--palette", required=True, help="Path to palette JSON")
    args = parser.parse_args()

    palette_path = Path(args.palette)
    data = json.loads(palette_path.read_text())

    name = data["name"]
    colors: dict[str, str] = data.get("colors", {})

    # Keep source palette Catppuccin-compatible: only canonical color names.
    # Derive tool-specific shades at render time.
    derived = {
        "minus_style": _blend(colors["base"], colors["red"], 0.20),
        "minus_emph_style": _blend(colors["base"], colors["red"], 0.35),
        "plus_style": _blend(colors["base"], colors["green"], 0.20),
        "plus_emph_style": _blend(colors["base"], colors["green"], 0.35),
        "map_purple": _blend(colors["base"], colors["mauve"], 0.35),
        "map_blue": _blend(colors["base"], colors["blue"], 0.35),
        "map_cyan": _blend(colors["base"], colors["sapphire"], 0.35),
        "map_yellow": _blend(colors["base"], colors["yellow"], 0.35),
    }

    values = {"name": name, **colors, **derived}

    targets = {
        "ghostty.conf.tmpl": DIST / "ghostty" / f"{name}.conf",
        "delta.gitconfig.tmpl": DIST / "delta" / f"{name}.gitconfig",
        "starship-palette.toml.tmpl": DIST / "starship" / f"{name}.toml",
    }

    for template_name, out_path in targets.items():
        template = (TEMPLATES / template_name).read_text()
        output = render_template(template, values)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(output)
        print(f"generated {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
