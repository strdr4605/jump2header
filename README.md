# jump2header#️⃣

![Tests status](https://github.com/strdr4605/jump2header/workflows/Tests/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/strdr4605/jump2header/badge.svg?branch=master)](https://coveralls.io/github/strdr4605/jump2header?branch=master)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Add "jump to" links for markdown headers

## Motivation[⬆](#jump2header️⃣)

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

## Installation[⬆](#jump2header️⃣)

```bash
npm i -g @strdr4605/jump2header
```

## Usage[⬆](#jump2header️⃣)

```bash
jump2header # By default README.md file will be parsed and overwritten
```

## API[⬆](#jump2header️⃣)

```bash
jump2header --help
Options:
  --help                       Show help                               [boolean]
  --version                    Show version number                     [boolean]
  --file, -f                   File to be parsed
                               Note: file shoud have .md extension
                                                 [string] [default: "README.md"]
  --output, -o                 File to write new content
                               Note: input file will be overwritten if not
                               provided                                 [string]
  --slug, -s, --header, -h     Specify header slug to jump to.
                               Note: use text after "#" in url.
                               https://github.com/<user>/<repo>#api -> api
                                                                        [string]
  --maxLevel, -l, --max-level  Specify maximal header level to insert links.
                               Note: value between 1 and 6
                               [number] [choices: 1, 2, 3, 4, 5, 6] [default: 6]
  --emoji, -e                  Specify the emoji for the links.
                               1 -> ⬆
                               2 -> 🔝
                               3 -> 🔙
                               4 -> 🆙
                               5 -> 🔼
                                  [number] [choices: 1, 2, 3, 4, 5] [default: 1]
  --silent                     By default jump2header will add comment to
                               created links.
                               Use this flag if you don't want the comment
                                                                       [boolean]
```

## Examples[⬆](#jump2header️⃣)

- [basic](examples/basic.md)
- [jump2SpecificSlug](examples/jump2SpecificSlug.md)
- [maxHeaderLevel](examples/maxHeaderLevel.md)
- [Emoji choise](examples/emojiChoise.md)

## TODO[⬆](#jump2header️⃣)

- [x] Option for custom emoji (or a choise of emoji's like 🔝, ⬇️, 🔙, 🔼, 🆙)
- [ ] Option to jump to previous header parent
- [ ] More unit/e2e tests
- [ ] More examples for people to see
- [ ] Investigate cases when this package may not work and alert future users

**Welcome for contributions and discussions**

## Development[⬆](#jump2header️⃣)

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
