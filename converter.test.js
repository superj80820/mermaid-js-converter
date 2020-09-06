const converter = require("./converter");

test("Markdown to SVG format", () => {
  const md = `# Test

Flow Chart

\`\`\`mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
\`\`\`

Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`

Class Diagram

\`\`\`mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    class Zebra{
      +bool is_wild
      +run()
    }
\`\`\`

State Diagram

\`\`\`mermaid
stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
\`\`\`

Pie Chart

\`\`\`mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
\`\`\`
`;
  const expectSVG = `# Test

Flow Chart

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5ncmFwaCBURFxuICAgIEFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuICAgIEIgLS0-IEN7TGV0IG1lIHRoaW5rfVxuICAgIEMgLS0-fE9uZXwgRFtMYXB0b3BdXG4gICAgQyAtLT58VHdvfCBFW2lQaG9uZV1cbiAgICBDIC0tPnxUaHJlZXwgRltmYTpmYS1jYXIgQ2FyXVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5ncmFwaCBURFxuICAgIEFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuICAgIEIgLS0-IEN7TGV0IG1lIHRoaW5rfVxuICAgIEMgLS0-fE9uZXwgRFtMYXB0b3BdXG4gICAgQyAtLT58VHdvfCBFW2lQaG9uZV1cbiAgICBDIC0tPnxUaHJlZXwgRltmYTpmYS1jYXIgQ2FyXVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

Sequence Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

Class Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgQW5pbWFsIDx8LS0gRHVja1xuICAgIEFuaW1hbCA8fC0tIEZpc2hcbiAgICBBbmltYWwgPHwtLSBaZWJyYVxuICAgIEFuaW1hbCA6ICtpbnQgYWdlXG4gICAgQW5pbWFsIDogK1N0cmluZyBnZW5kZXJcbiAgICBBbmltYWw6ICtpc01hbW1hbCgpXG4gICAgQW5pbWFsOiArbWF0ZSgpXG4gICAgY2xhc3MgRHVja3tcbiAgICAgICtTdHJpbmcgYmVha0NvbG9yXG4gICAgICArc3dpbSgpXG4gICAgICArcXVhY2soKVxuICAgIH1cbiAgICBjbGFzcyBGaXNoe1xuICAgICAgLWludCBzaXplSW5GZWV0XG4gICAgICAtY2FuRWF0KClcbiAgICB9XG4gICAgY2xhc3MgWmVicmF7XG4gICAgICArYm9vbCBpc193aWxkXG4gICAgICArcnVuKClcbiAgICB9XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgQW5pbWFsIDx8LS0gRHVja1xuICAgIEFuaW1hbCA8fC0tIEZpc2hcbiAgICBBbmltYWwgPHwtLSBaZWJyYVxuICAgIEFuaW1hbCA6ICtpbnQgYWdlXG4gICAgQW5pbWFsIDogK1N0cmluZyBnZW5kZXJcbiAgICBBbmltYWw6ICtpc01hbW1hbCgpXG4gICAgQW5pbWFsOiArbWF0ZSgpXG4gICAgY2xhc3MgRHVja3tcbiAgICAgICtTdHJpbmcgYmVha0NvbG9yXG4gICAgICArc3dpbSgpXG4gICAgICArcXVhY2soKVxuICAgIH1cbiAgICBjbGFzcyBGaXNoe1xuICAgICAgLWludCBzaXplSW5GZWV0XG4gICAgICAtY2FuRWF0KClcbiAgICB9XG4gICAgY2xhc3MgWmVicmF7XG4gICAgICArYm9vbCBpc193aWxkXG4gICAgICArcnVuKClcbiAgICB9XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

State Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zdGF0ZURpYWdyYW1cbiAgICBbKl0gLS0-IFN0aWxsXG4gICAgU3RpbGwgLS0-IFsqXVxuICAgIFN0aWxsIC0tPiBNb3ZpbmdcbiAgICBNb3ZpbmcgLS0-IFN0aWxsXG4gICAgTW92aW5nIC0tPiBDcmFzaFxuICAgIENyYXNoIC0tPiBbKl1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zdGF0ZURpYWdyYW1cbiAgICBbKl0gLS0-IFN0aWxsXG4gICAgU3RpbGwgLS0-IFsqXVxuICAgIFN0aWxsIC0tPiBNb3ZpbmdcbiAgICBNb3ZpbmcgLS0-IFN0aWxsXG4gICAgTW92aW5nIC0tPiBDcmFzaFxuICAgIENyYXNoIC0tPiBbKl1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)

Pie Chart

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5waWUgdGl0bGUgUGV0cyBhZG9wdGVkIGJ5IHZvbHVudGVlcnNcbiAgICBcIkRvZ3NcIiA6IDM4NlxuICAgIFwiQ2F0c1wiIDogODVcbiAgICBcIlJhdHNcIiA6IDE1XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5waWUgdGl0bGUgUGV0cyBhZG9wdGVkIGJ5IHZvbHVudGVlcnNcbiAgICBcIkRvZ3NcIiA6IDM4NlxuICAgIFwiQ2F0c1wiIDogODVcbiAgICBcIlJhdHNcIiA6IDE1XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)
`;

  expect(converter.mdToSVG(md)).toBe(expectSVG);
});

test("SVG to markdown format", () => {
  const SVG = `# Test

Flow Chart

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5ncmFwaCBURFxuICAgIEFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuICAgIEIgLS0-IEN7TGV0IG1lIHRoaW5rfVxuICAgIEMgLS0-fE9uZXwgRFtMYXB0b3BdXG4gICAgQyAtLT58VHdvfCBFW2lQaG9uZV1cbiAgICBDIC0tPnxUaHJlZXwgRltmYTpmYS1jYXIgQ2FyXVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5ncmFwaCBURFxuICAgIEFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuICAgIEIgLS0-IEN7TGV0IG1lIHRoaW5rfVxuICAgIEMgLS0-fE9uZXwgRFtMYXB0b3BdXG4gICAgQyAtLT58VHdvfCBFW2lQaG9uZV1cbiAgICBDIC0tPnxUaHJlZXwgRltmYTpmYS1jYXIgQ2FyXVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

Sequence Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

Class Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgQW5pbWFsIDx8LS0gRHVja1xuICAgIEFuaW1hbCA8fC0tIEZpc2hcbiAgICBBbmltYWwgPHwtLSBaZWJyYVxuICAgIEFuaW1hbCA6ICtpbnQgYWdlXG4gICAgQW5pbWFsIDogK1N0cmluZyBnZW5kZXJcbiAgICBBbmltYWw6ICtpc01hbW1hbCgpXG4gICAgQW5pbWFsOiArbWF0ZSgpXG4gICAgY2xhc3MgRHVja3tcbiAgICAgICtTdHJpbmcgYmVha0NvbG9yXG4gICAgICArc3dpbSgpXG4gICAgICArcXVhY2soKVxuICAgIH1cbiAgICBjbGFzcyBGaXNoe1xuICAgICAgLWludCBzaXplSW5GZWV0XG4gICAgICAtY2FuRWF0KClcbiAgICB9XG4gICAgY2xhc3MgWmVicmF7XG4gICAgICArYm9vbCBpc193aWxkXG4gICAgICArcnVuKClcbiAgICB9XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgQW5pbWFsIDx8LS0gRHVja1xuICAgIEFuaW1hbCA8fC0tIEZpc2hcbiAgICBBbmltYWwgPHwtLSBaZWJyYVxuICAgIEFuaW1hbCA6ICtpbnQgYWdlXG4gICAgQW5pbWFsIDogK1N0cmluZyBnZW5kZXJcbiAgICBBbmltYWw6ICtpc01hbW1hbCgpXG4gICAgQW5pbWFsOiArbWF0ZSgpXG4gICAgY2xhc3MgRHVja3tcbiAgICAgICtTdHJpbmcgYmVha0NvbG9yXG4gICAgICArc3dpbSgpXG4gICAgICArcXVhY2soKVxuICAgIH1cbiAgICBjbGFzcyBGaXNoe1xuICAgICAgLWludCBzaXplSW5GZWV0XG4gICAgICAtY2FuRWF0KClcbiAgICB9XG4gICAgY2xhc3MgWmVicmF7XG4gICAgICArYm9vbCBpc193aWxkXG4gICAgICArcnVuKClcbiAgICB9XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

State Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zdGF0ZURpYWdyYW1cbiAgICBbKl0gLS0-IFN0aWxsXG4gICAgU3RpbGwgLS0-IFsqXVxuICAgIFN0aWxsIC0tPiBNb3ZpbmdcbiAgICBNb3ZpbmcgLS0-IFN0aWxsXG4gICAgTW92aW5nIC0tPiBDcmFzaFxuICAgIENyYXNoIC0tPiBbKl1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zdGF0ZURpYWdyYW1cbiAgICBbKl0gLS0-IFN0aWxsXG4gICAgU3RpbGwgLS0-IFsqXVxuICAgIFN0aWxsIC0tPiBNb3ZpbmdcbiAgICBNb3ZpbmcgLS0-IFN0aWxsXG4gICAgTW92aW5nIC0tPiBDcmFzaFxuICAgIENyYXNoIC0tPiBbKl1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)

Pie Chart

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5waWUgdGl0bGUgUGV0cyBhZG9wdGVkIGJ5IHZvbHVudGVlcnNcbiAgICBcIkRvZ3NcIiA6IDM4NlxuICAgIFwiQ2F0c1wiIDogODVcbiAgICBcIlJhdHNcIiA6IDE1XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5waWUgdGl0bGUgUGV0cyBhZG9wdGVkIGJ5IHZvbHVudGVlcnNcbiAgICBcIkRvZ3NcIiA6IDM4NlxuICAgIFwiQ2F0c1wiIDogODVcbiAgICBcIlJhdHNcIiA6IDE1XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)
`;
  const expectMd = `# Test

Flow Chart

\`\`\`mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
\`\`\`

Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
\`\`\`

Class Diagram

\`\`\`mermaid
classDiagram
    Animal <|-- Duck
    Animal <|-- Fish
    Animal <|-- Zebra
    Animal : +int age
    Animal : +String gender
    Animal: +isMammal()
    Animal: +mate()
    class Duck{
      +String beakColor
      +swim()
      +quack()
    }
    class Fish{
      -int sizeInFeet
      -canEat()
    }
    class Zebra{
      +bool is_wild
      +run()
    }
\`\`\`

State Diagram

\`\`\`mermaid
stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
\`\`\`

Pie Chart

\`\`\`mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
\`\`\`
`;

  expect(converter.SVGToMd(SVG)).toBe(expectMd);
});
