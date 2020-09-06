const converter = require("./converter");

test("Markdown to SVG format", () => {
  const md = `# test

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`

test

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello ttt, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`

test2

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello rrrr, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`
`;
  const expectSVG = `# test

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

test

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyB0dHQsIGhvdyBhcmUgeW91P1xuICAgIEFsaWNlLT4-K0pvaG46IEpvaG4sIGNhbiB5b3UgaGVhciBtZT9cbiAgICBKb2huLS0-Pi1BbGljZTogSGkgQWxpY2UsIEkgY2FuIGhlYXIgeW91IVxuICAgIEpvaG4tLT4-LUFsaWNlOiBJIGZlZWwgZ3JlYXQhXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyB0dHQsIGhvdyBhcmUgeW91P1xuICAgIEFsaWNlLT4-K0pvaG46IEpvaG4sIGNhbiB5b3UgaGVhciBtZT9cbiAgICBKb2huLS0-Pi1BbGljZTogSGkgQWxpY2UsIEkgY2FuIGhlYXIgeW91IVxuICAgIEpvaG4tLT4-LUFsaWNlOiBJIGZlZWwgZ3JlYXQhXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

test2

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBycnJyLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBycnJyLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)
`;

  expect(converter.mdToSVG(md)).toBe(expectSVG);
});

test("SVG to markdown format", () => {
  const SVG = `# test

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

test

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyB0dHQsIGhvdyBhcmUgeW91P1xuICAgIEFsaWNlLT4-K0pvaG46IEpvaG4sIGNhbiB5b3UgaGVhciBtZT9cbiAgICBKb2huLS0-Pi1BbGljZTogSGkgQWxpY2UsIEkgY2FuIGhlYXIgeW91IVxuICAgIEpvaG4tLT4-LUFsaWNlOiBJIGZlZWwgZ3JlYXQhXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyB0dHQsIGhvdyBhcmUgeW91P1xuICAgIEFsaWNlLT4-K0pvaG46IEpvaG4sIGNhbiB5b3UgaGVhciBtZT9cbiAgICBKb2huLS0-Pi1BbGljZTogSGkgQWxpY2UsIEkgY2FuIGhlYXIgeW91IVxuICAgIEpvaG4tLT4-LUFsaWNlOiBJIGZlZWwgZ3JlYXQhXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

test2

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBycnJyLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBycnJyLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)
`;
  const expectMd = `# test

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`

test

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello ttt, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`

test2

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello rrrr, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`
`;

  expect(converter.SVGToMd(SVG)).toBe(expectMd);
});
