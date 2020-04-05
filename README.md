# jump2header#️⃣

![Tests status](https://github.com/strdr4605/jump2header/workflows/Tests/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/strdr4605/jump2header/badge.svg?branch=master)](https://coveralls.io/github/strdr4605/jump2header?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Add "jump to" links for markdown headers

## Motivation

When README is too long and it takes to much time to scroll back it is better to have a link back to top

```md
# awesome-project
...
Really long README
...
## Some section[⬆️](#awesome-project)
...
### Another section[⬆️](#awesome-project)
```

## Installation

```bash
npm i -g @strdr4605/jump2header
```

## Usage

```bash
jump2header # By default README.md file will be parsed and overwritten
```

## API

```bash
jump2header --help
Options:
  --help                    Show help                                  [boolean]
  --version                 Show version number                        [boolean]
  --file, -f                File to be parsed
                            Note: file shoud have .md extension
                                                 [string] [default: "README.md"]
  --output, -o              File to write new content
                            Note: input file will be overwritten if not provided
                                                                        [string]
  --slug, -s, --header, -h  Specify header slug to jump to.
                            Note: use text after "#" in url.
                            https://github.com/<user>/<repo>#api -> api [string]
```

## Examples

| Initial markdown file        | output                         |
| ---------------------------- | ------------------------------ |
| [input1](examples/input1.md) | [output1](examples/output1.md) |

## TODO

- [ ] Option for custom emoji (or a choise of emoji's like 🔝, ⬇️, 🔙, 🔼, 🆙)
- [ ] Option to jump to previous header parent 
- [ ] More unit/e2e tests
- [ ] More examples for people to see
- [ ] Investigate cases when this package may not work and alert future users

**Welcome for contributions and discussions**

## Development

```bash
npm i
npm run build:watch
```

In another tab

```bash
npm link
jump2header --help # or any other options
npm unlink # unlink after finishing work
```

<a href="https://www.buymeacoffee.com/strdr4605"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;"  target="_blank"></a>
