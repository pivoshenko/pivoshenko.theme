"""Script that renders theme files from a palette JSON and Jinja templates."""

import argparse
import json
import pathlib
import types
import typing

import jinja2

ROOTPATH = pathlib.Path(__file__).resolve().parent.parent


def _hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def _rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    return "#%02x%02x%02x" % rgb


def _extract_hex(value: typing.Any) -> str:
    if isinstance(value, dict):
        return str(value["hex"])
    if hasattr(value, "hex"):
        return str(getattr(value, "hex"))
    return str(value)


def _mix(value: typing.Any, color: typing.Any, amount: float = 0.5) -> dict[str, str]:
    """Mix two colors and return a mapping with `hex` for get(key='hex')."""
    left = _extract_hex(value)
    right = _extract_hex(color)

    lr, lg, lb = _hex_to_rgb(str(left))
    rr, rg, rb = _hex_to_rgb(str(right))
    ratio_left = 1.0 - amount
    mixed = (
        round(lr * ratio_left + rr * amount),
        round(lg * ratio_left + rg * amount),
        round(lb * ratio_left + rb * amount),
    )
    return {"hex": _rgb_to_hex(mixed)}


def _get(value: typing.Any, key: str) -> typing.Any:
    if isinstance(value, dict):
        return value[key]
    if hasattr(value, key):
        return getattr(value, key)
    return getattr(value, key)


def _iif(cond: bool, t: typing.Any, f: typing.Any) -> typing.Any:
    return t if cond else f


def _normalize_template(text: str) -> str:
    """Handle a couple of Catppuccin-style constructs in template examples."""
    return text.replace("{{ if(", "{{ iif(").replace("=#{{", "={{")


def _render_target_from_template(
    template_path: pathlib.Path, theme_name: str
) -> pathlib.Path:
    # e.g. ghostty.conf.jinja -> dist/ghostty/<theme_name>.conf
    if not template_path.name.endswith(".jinja"):
        raise ValueError(f"Template must end with .jinja: {template_path}")

    base = template_path.name[: -len(".jinja")]
    parts = base.split(".")
    tool = parts[0]
    extension = ".".join(parts[1:]) if len(parts) > 1 else "txt"
    return ROOTPATH / "dist" / tool / f"{theme_name}.{extension}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Render theme files from palette JSON")
    parser.add_argument(
        "--palette",
        default=str(ROOTPATH / "palettes" / "night.json"),
        help="Path to palette JSON (default: palettes/night.json)",
    )
    parser.add_argument(
        "--templates-dir",
        default=str(ROOTPATH / "templates"),
        help="Directory with *.jinja templates",
    )
    args = parser.parse_args()

    palette_path = pathlib.Path(args.palette)
    templates_dir = pathlib.Path(args.templates_dir)

    data = json.loads(palette_path.read_text())
    theme_name = data["name"]
    flavor_name = data.get("flavor", "dark")
    colors: dict[str, str] = data.get("colors", {})

    color_ctx = {
        name: types.SimpleNamespace(hex=value) for name, value in colors.items()
    }
    context = {
        "name": theme_name,
        "flavor": types.SimpleNamespace(
            dark=flavor_name == "dark", light=flavor_name == "light"
        ),
        **color_ctx,
    }

    env = jinja2.Environment(
        undefined=jinja2.StrictUndefined,
        autoescape=False,
        trim_blocks=False,
        lstrip_blocks=False,
    )
    env.globals["iif"] = _iif
    env.filters["mix"] = _mix
    env.filters["get"] = _get

    templates = sorted(templates_dir.glob("*.jinja"))
    if not templates:
        raise SystemExit(f"No templates found in {templates_dir}")

    for template_path in templates:
        raw_template = template_path.read_text()
        template = env.from_string(_normalize_template(raw_template))
        rendered = template.render(context)

        output_path = _render_target_from_template(template_path, theme_name)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(rendered.rstrip() + "\n")


if __name__ == "__main__":
    main()
