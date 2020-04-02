# jump2header#️⃣

Add "jump to" links for markdown headers

## Motivation

When README is too long better to have a link back to top

```md
# awesome-project
...
Really long README
...
## Some section[⬆️](#awesome-project)
...
### Another section[⬆️](#awesome-project)
```

## Examples

| Initial markdown file        | output                         |
| ---------------------------- | ------------------------------ |
| [input1](examples/input1.md) | [output1](examples/output1.md) |

## Develoment

```bash
npm i
npm run build
npm link
jump2header fileToChange.md optionalOutputFile.md
npm unlink
```
