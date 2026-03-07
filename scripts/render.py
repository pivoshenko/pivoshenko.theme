"""Script that renders theme files from a palette JSON and Jinja templates."""  # noqa: EXE002

from __future__ import annotations

import sys
import json
import types
import typing
import pathlib
import argparse

import jinja2
import loguru


def _log_format(record: dict[str, typing.Any]) -> str:
    level = record["level"].name
    color = {
        "INFO": "green",
        "WARNING": "yellow",
        "ERROR": "red",
        "CRITICAL": "red",
    }.get(level, "white")
    return f"<{color}>[render] {{message}}</{color}>\n"


logger = loguru.logger
logger.remove()
logger.add(sys.stdout, format=_log_format, colorize=True)

ROOTPATH = pathlib.Path(__file__).resolve().parent.parent


def _hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def _rgb_to_hex(rgb: tuple[int, int, int]) -> str:
    return "#%02x%02x%02x" % rgb  # noqa: UP031


def _extract_hex(value: typing.Any) -> str:
    if isinstance(value, dict):
        return str(value["hex"])
    if hasattr(value, "hex"):
        return str(getattr(value, "hex"))  # noqa: B009
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


def _iif(cond: bool, t: typing.Any, f: typing.Any) -> typing.Any:  # noqa: FBT001
    return t if cond else f


def _normalize_template(text: str) -> str:
    """Handle a couple of style constructs in template examples."""
    return text.replace("{{ if(", "{{ iif(").replace("=#{{", "={{")


def _render_target_from_template(template_path: pathlib.Path, theme_name: str) -> pathlib.Path:
    # e.g. ghostty.conf.jinja -> dist/ghostty/<theme_name>.conf
    if not template_path.name.endswith(".jinja"):
        msg = f"Template must end with .jinja: {template_path.name}"
        logger.error(msg)
        raise ValueError(msg)

    base = template_path.name[: -len(".jinja")]
    parts = base.split(".")
    tool = parts[0]
    extension = ".".join(parts[1:]) if len(parts) > 1 else "txt"
    return ROOTPATH / "dist" / tool / f"{theme_name}.{extension}"


def main() -> None:
    parser = argparse.ArgumentParser(description="Render theme files from palette JSON")
    parser.add_argument(
        "--palette",
        default=str(ROOTPATH / "palettes" / "morok_dark.json"),
        help="Path to palette JSON (default: palettes/morok_dark.json)",
    )
    parser.add_argument(
        "--templates-dir",
        default=str(ROOTPATH / "templates"),
        help="Directory with *.jinja templates",
    )
    args = parser.parse_args()

    palette_path = pathlib.Path(args.palette)
    templates_dir = pathlib.Path(args.templates_dir)
    logger.info(
        f"Starting theme render with palette={palette_path.name} templates_dir={templates_dir.name}",  # noqa: E501
    )

    if not palette_path.exists():
        msg = f"Palette file not found: {palette_path.name}"
        logger.error(msg)
        raise FileNotFoundError(msg)

    if not templates_dir.exists():
        msg = f"Templates directory not found: {templates_dir.name}"
        logger.error(msg)
        raise FileNotFoundError(msg)

    logger.info(f"Loading palette from {palette_path.name}")
    data = json.loads(palette_path.read_text())
    theme_name = data["name"]
    flavor_name = data.get("flavor", "dark")
    colors: dict[str, str] = data.get("colors", {})
    logger.info(f"Loaded palette name={theme_name} flavor={flavor_name} colors={len(colors)}")

    if not colors:
        logger.warning(f"Palette {palette_path.name} does not define any colors")

    color_ctx = {name: types.SimpleNamespace(hex=value) for name, value in colors.items()}
    context = {
        "name": theme_name,
        "flavor": types.SimpleNamespace(dark=flavor_name == "dark", light=flavor_name == "light"),
        **color_ctx,
    }

    env = jinja2.Environment(
        undefined=jinja2.StrictUndefined,
        autoescape=False,  # noqa: S701
        trim_blocks=False,
        lstrip_blocks=False,
    )
    env.globals["iif"] = _iif
    env.filters["mix"] = _mix
    env.filters["get"] = _get

    templates = sorted(templates_dir.glob("*.jinja"))
    if not templates:
        msg = f"No templates found in {templates_dir.name}"
        logger.error(msg)
        raise SystemExit(msg)
    logger.info(f"Found {len(templates)} templates to render")

    for template_path in templates:
        logger.info(f"Rendering template {template_path.name}")
        raw_template = template_path.read_text()
        template = env.from_string(_normalize_template(raw_template))
        rendered = template.render(context)

        output_path = _render_target_from_template(template_path, theme_name)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(rendered.rstrip() + "\n")
        logger.info(f"Wrote rendered file to {output_path.name}")

    logger.info(f"Finished rendering theme {theme_name}")


if __name__ == "__main__":
    main()
