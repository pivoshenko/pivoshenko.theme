import { morokShikiTheme } from '@/lib/shiki-theme'
import { getPalette } from '@/lib/theme-data'
import { codeToHtml } from 'shiki'
import { type CodeExample, ExamplesSection } from './examples-section'

const samples: {
  id: string
  label: string
  language: string
  filename: string
  code: string
}[] = [
  {
    id: 'rust',
    label: 'rust',
    language: 'rust',
    filename: 'palette.rs',
    code: `use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct Palette {
    pub name: String,
    pub colors: HashMap<String, String>,
}

impl Palette {
    pub fn new(name: impl Into<String>) -> Self {
        Self {
            name: name.into(),
            colors: HashMap::new(),
        }
    }

    pub fn accent(&self, key: &str) -> Option<&str> {
        self.colors.get(key).map(String::as_str)
    }
}

fn main() {
    let mut p = Palette::new("morok");
    p.colors.insert("mauve".into(), "#a78cc4".into());
    println!("{:?}", p.accent("mauve"));
}
`,
  },
  {
    id: 'tsx',
    label: 'tsx',
    language: 'tsx',
    filename: 'swatch.tsx',
    code: `import { useState } from 'react'

type Color = { name: string; hex: string }

export function Swatch({ name, hex }: Color) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <button onClick={copy} style={{ background: hex }}>
      <span>{name}</span>
      {copied && <em>copied!</em>}
    </button>
  )
}
`,
  },
  {
    id: 'python',
    label: 'python',
    language: 'python',
    filename: 'palette.py',
    code: `from dataclasses import dataclass
from pathlib import Path
import json

@dataclass(frozen=True)
class Palette:
    name: str
    flavor: str
    colors: dict[str, str]

    @classmethod
    def load(cls, path: Path) -> "Palette":
        data = json.loads(path.read_text())
        return cls(
            name=data["name"],
            flavor=data["flavor"],
            colors=data["colors"],
        )

    def accent(self, key: str) -> str | None:
        return self.colors.get(key)


if __name__ == "__main__":
    p = Palette.load(Path("morok.json"))
    print(p.accent("mauve"))
`,
  },
  {
    id: 'go',
    label: 'go',
    language: 'go',
    filename: 'palette.go',
    code: `package morok

import (
	"encoding/json"
	"fmt"
	"os"
)

type Palette struct {
	Name   string            \`json:"name"\`
	Flavor string            \`json:"flavor"\`
	Colors map[string]string \`json:"colors"\`
}

func Load(path string) (*Palette, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read palette: %w", err)
	}
	var p Palette
	if err := json.Unmarshal(data, &p); err != nil {
		return nil, err
	}
	return &p, nil
}

func (p *Palette) Accent(key string) (string, bool) {
	hex, ok := p.Colors[key]
	return hex, ok
}
`,
  },
  {
    id: 'fish',
    label: 'fish',
    language: 'fish',
    filename: 'config.fish',
    code: `# fish config — morok theme
set -gx EDITOR helix
set -gx PAGER bat
set -gx LANG en_US.UTF-8

function fish_prompt
    set -l last_status $status
    set_color a78cc4
    echo -n "❯ "
    set_color 7f98bf
    echo -n (prompt_pwd)
    set_color 8ea98c
    echo -n " ("(git branch --show-current 2>/dev/null)") "
    set_color normal
end

abbr -a g git
abbr -a gst 'git status'
abbr -a gco 'git checkout'
`,
  },
  {
    id: 'toml',
    label: 'toml',
    language: 'toml',
    filename: 'starship.toml',
    code: `# starship config — morok palette
format = """
$directory\\
$git_branch\\
$git_status\\
$cmd_duration\\
$character"""

[character]
success_symbol = "[❯](#a78cc4)"
error_symbol = "[❯](#c98787)"

[directory]
style = "#7f98bf"
truncation_length = 3

[git_branch]
symbol = " "
style = "#8ea98c"

[git_status]
style = "#d0a178"
`,
  },
]

export async function Examples() {
  const palette = getPalette()
  const theme = morokShikiTheme(palette.map)

  const examples: CodeExample[] = await Promise.all(
    samples.map(async (s) => {
      const html = await codeToHtml(s.code, { lang: s.language, theme })
      return {
        id: s.id,
        label: s.label,
        language: s.language,
        filename: s.filename,
        html,
      }
    }),
  )

  return <ExamplesSection examples={examples} palette={palette.map} />
}
