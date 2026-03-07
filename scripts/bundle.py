"""Script that bundles userstyles into a Stylus-compatible import JSON."""

from __future__ import annotations

import re
import sys
import json
import typing
import hashlib
import pathlib
import argparse

import loguru


def _log_format(record: dict[str, typing.Any]) -> str:
    level = record["level"].name
    color = {
        "INFO": "green",
        "WARNING": "yellow",
        "ERROR": "red",
        "CRITICAL": "red",
    }.get(level, "white")
    return f"<{color}>[bundle] {{message}}</{color}>\n"


logger = loguru.logger
logger.remove()
logger.add(sys.stdout, format=_log_format, colorize=True)

ROOTPATH = pathlib.Path(__file__).resolve().parent.parent
USERSTYLE_HEADER_RE = re.compile(
    r"/\*\s*==UserStyle==(?P<header>.*?)==/UserStyle==\s*\*/",
    re.DOTALL | re.IGNORECASE,
)
VAR_RE = re.compile(
    r'^@var\s+(?P<type>\w+)\s+(?P<name>[^\s]+)\s+"(?P<label>[^"]+)"\s+(?P<value>.+)$',
)


def _strip_header_line(line: str) -> str:
    return line.strip().lstrip("*").strip()


def _parse_select_options(raw: str) -> list[dict[str, str]]:
    try:
        values = json.loads(raw)
    except json.JSONDecodeError:
        logger.warning("Failed to parse @var options as JSON; preserving raw value")
        return []

    options: list[dict[str, str]] = []
    for item in values:
        if not isinstance(item, str):
            continue
        value, _sep, label = item.partition(":")
        option_label = label or value
        is_default = option_label.endswith("*")
        if is_default:
            option_label = option_label[:-1]
        options.append(
            {
                "name": value,
                "value": value,
                "label": option_label,
                "default": "1" if is_default else "0",
            },
        )
    return options


def _parse_var_value(var_type: str, raw: str) -> dict[str, typing.Any]:
    if var_type in {"select", "dropdown", "image"}:
        options = _parse_select_options(raw)
        if not options:
            return {"options": [], "default": None, "value": None}
        default_option = next(
            (option for option in options if option["default"] == "1"), options[0]
        )
        default_value = default_option["name"]
        return {"options": options, "default": default_value, "value": default_value}

    value = raw
    if value.startswith('"') and value.endswith('"') and len(value) >= 2:
        value = value[1:-1]
    return {"default": value, "value": value}


def _parse_var_line(line: str) -> tuple[str, str, str, str] | None:
    var_match = VAR_RE.match(line)
    if var_match is not None:
        return (
            var_match.group("type"),
            var_match.group("name"),
            var_match.group("label"),
            var_match.group("value").strip(),
        )

    # Recover malformed lines like:
    # @var select darkFlavor @var select flavor "Flavor" ["dark:Dark*"]
    # We keep the intended variable name from the first segment and parse label/value from the second.  # noqa: E501
    duplicate_marker = " @var "
    if duplicate_marker not in line:
        return None
    first, _, second = line.partition(duplicate_marker)
    first_parts = first.split()
    if len(first_parts) < 3:
        return None
    malformed_name = first_parts[2]
    nested = "@var " + second.strip()
    nested_match = VAR_RE.match(nested)
    if nested_match is None:
        return None
    return (
        first_parts[1],
        malformed_name,
        nested_match.group("label"),
        nested_match.group("value").strip(),
    )


def parse_usercss_metadata(content: str, file_path: pathlib.Path) -> dict[str, typing.Any]:
    match = USERSTYLE_HEADER_RE.search(content)
    if match is None:
        msg = f"Missing ==UserStyle== metadata block in {file_path.name}"
        logger.error(msg)
        raise ValueError(msg)

    metadata: dict[str, typing.Any] = {}
    vars_data: dict[str, dict[str, typing.Any]] = {}
    for line in match.group("header").splitlines():
        stripped = _strip_header_line(line)
        if not stripped or not stripped.startswith("@"):
            continue

        if stripped.startswith("@var "):
            parsed = _parse_var_line(stripped)
            if parsed is None:
                logger.warning(f"Skipping unsupported @var format in {file_path.name}")
                continue
            var_type, var_name, var_label, var_raw_value = parsed
            vars_data[var_name] = {
                "type": var_type,
                "name": var_name,
                "label": var_label,
                **_parse_var_value(var_type, var_raw_value),
            }
            continue

        key, _, value = stripped[1:].partition(" ")
        if not value:
            continue
        metadata[key] = value.strip()

    if vars_data:
        metadata["vars"] = vars_data

    if "homepageURL" in metadata and "url" not in metadata:
        metadata["url"] = metadata["homepageURL"]

    return metadata


def calc_style_digest(style: dict[str, typing.Any]) -> str:
    source = (
        str(style["sourceCode"])
        if style.get("usercssData")
        else json.dumps(
            [
                {
                    "code": section.get("code", ""),
                    "urls": section.get("urls", []),
                    "urlPrefixes": section.get("urlPrefixes", []),
                    "domains": section.get("domains", []),
                    "regexps": section.get("regexps", []),
                }
                for section in style.get("sections", [])
            ],
        )
    )
    return hashlib.sha1(source.encode("utf-8")).hexdigest()  # noqa: S324


def get_userstyles_files(styles_dir: pathlib.Path, filename: str) -> list[pathlib.Path]:
    files: list[pathlib.Path] = []
    for entry in sorted(styles_dir.iterdir()):
        if not entry.is_dir():
            continue
        candidate = entry / filename
        if candidate.exists():
            files.append(candidate)
    return files


def main() -> None:
    parser = argparse.ArgumentParser(description="Bundle userstyles into Stylus import JSON")
    parser.add_argument(
        "--styles-dir",
        default=str(ROOTPATH / "userstyles" / "styles"),
        help="Directory containing userstyle subdirectories",
    )
    parser.add_argument(
        "--style-filename",
        default="style.user.less",
        help="Style filename in each userstyle directory",
    )
    parser.add_argument(
        "--output",
        default=str(ROOTPATH / "dist" / "stylus" / "morok.json"),
        help="Output import JSON path",
    )
    args = parser.parse_args()

    styles_dir = pathlib.Path(args.styles_dir)
    output_path = pathlib.Path(args.output)
    logger.info(
        f"Starting userstyles bundle with styles_dir={styles_dir.name} output={output_path.name}",
    )

    if not styles_dir.exists():
        msg = f"Styles directory not found: {styles_dir}"
        logger.error(msg)
        raise FileNotFoundError(msg)

    settings = {
        "settings": {
            "updateInterval": 24,
            "updateOnlyEnabled": True,
            "patchCsp": True,
            "editor.linter": "",
        },
    }
    data: list[dict[str, typing.Any]] = [settings]

    style_files = get_userstyles_files(styles_dir, args.style_filename)
    if not style_files:
        msg = f"No userstyles found in {styles_dir} with filename={args.style_filename}"
        logger.error(msg)
        raise SystemExit(msg)
    logger.info(f"Found {len(style_files)} userstyles")

    for style_file in style_files:
        logger.info(f"Bundling {style_file.parent.name}")
        content = style_file.read_text(encoding="utf-8")
        metadata = parse_usercss_metadata(content, style_file)

        style: dict[str, typing.Any] = {
            "enabled": True,
            "name": metadata.get("name", style_file.parent.name),
            "description": metadata.get("description", ""),
            "author": metadata.get("author", ""),
            "url": metadata.get("url", ""),
            "updateUrl": metadata.get("updateURL", ""),
            "usercssData": metadata,
            "sourceCode": content,
        }
        style["originalDigest"] = calc_style_digest(style)
        data.append(style)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    logger.info(f"Wrote import bundle to {output_path}")


if __name__ == "__main__":
    main()
