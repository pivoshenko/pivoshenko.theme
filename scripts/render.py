#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = ROOT / "templates"
DIST = ROOT / "dist"


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
    derived: dict[str, str] = data.get("derived", {})

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
