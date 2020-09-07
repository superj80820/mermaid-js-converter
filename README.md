# mermaid-js-converter

You can use command line to convert [Mermaid](https://github.com/mermaid-js/mermaid)'s Markdown format into a more general SVG.

## Requires

- [Node.js](https://nodejs.org/en/)

## Install

```bash
$ npm install -g mermaid-js-converter
```

## How to use

<img src="https://i.imgur.com/tB57hpi.png" width="450">

Add `mermaid` to the code block in Markdown to make this tool detect conversion. Like [example.md](./example.md)

![](https://i.imgur.com/Tkf5vim.gif)

Then execute the conversion command line.

```bash
$ mjc -f myMD.md -o SVG
```

- -f: File name
- -o: Output format
  - md: SVG to markdown
  - SVG: Markdown to SVG

## Why this repository

[Mermaid](https://github.com/mermaid-js/mermaid) is a very cool development tool.

Although Gitlab has been supported, it is not supported Github.

This repository is affected by this [issue](https://github.com/github/markup/issues/533) inspired.

If the Markdown of a website does not support Mermaid, you can use this tool.

Of course, it would be better if Mermaid could be listed as a Markdown standard.

## Support

- [x] Flow Chart
- [x] Sequence Diagram
- [x] Class Diagram
- [x] State Diagram
- [x] Gantt Chart
- [x] Pie Chart
- [x] ER Diagram
- [x] User Journey
