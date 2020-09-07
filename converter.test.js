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

Gantt Diagram

\`\`\`mermaid
gantt
  section Section
  Completed :done,    des1, 2014-01-06,2014-01-08
  Active        :active,  des2, 2014-01-07, 3d
  Parallel 1   :         des3, after des1, 1d
  Parallel 2   :         des4, after des1, 1d
  Parallel 3   :         des5, after des3, 1d
  Parallel 4   :         des6, after des4, 1d
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

ER Diagram

\`\`\`mermaid
erDiagram
    CUSTOMER }|..|{ DELIVERY-ADDRESS : has
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ INVOICE : "liable for"
    DELIVERY-ADDRESS ||--o{ ORDER : receives
    INVOICE ||--|{ ORDER : covers
    ORDER ||--|{ ORDER-ITEM : includes
    PRODUCT-CATEGORY ||--|{ PRODUCT : contains
    PRODUCT ||--o{ ORDER-ITEM : "ordered in"
\`\`\`

User Journey

\`\`\`mermaid
journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 3: Me
\`\`\`
`;
  const expectSVG = `# Test

Flow Chart

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5ncmFwaCBURFxuICAgIEFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuICAgIEIgLS0-IEN7TGV0IG1lIHRoaW5rfVxuICAgIEMgLS0-fE9uZXwgRFtMYXB0b3BdXG4gICAgQyAtLT58VHdvfCBFW2lQaG9uZV1cbiAgICBDIC0tPnxUaHJlZXwgRltmYTpmYS1jYXIgQ2FyXVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5ncmFwaCBURFxuICAgIEFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuICAgIEIgLS0-IEN7TGV0IG1lIHRoaW5rfVxuICAgIEMgLS0-fE9uZXwgRFtMYXB0b3BdXG4gICAgQyAtLT58VHdvfCBFW2lQaG9uZV1cbiAgICBDIC0tPnxUaHJlZXwgRltmYTpmYS1jYXIgQ2FyXVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

Sequence Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

Gantt Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ2FudHRcbiAgc2VjdGlvbiBTZWN0aW9uXG4gIENvbXBsZXRlZCA6ZG9uZSwgICAgZGVzMSwgMjAxNC0wMS0wNiwyMDE0LTAxLTA4XG4gIEFjdGl2ZSAgICAgICAgOmFjdGl2ZSwgIGRlczIsIDIwMTQtMDEtMDcsIDNkXG4gIFBhcmFsbGVsIDEgICA6ICAgICAgICAgZGVzMywgYWZ0ZXIgZGVzMSwgMWRcbiAgUGFyYWxsZWwgMiAgIDogICAgICAgICBkZXM0LCBhZnRlciBkZXMxLCAxZFxuICBQYXJhbGxlbCAzICAgOiAgICAgICAgIGRlczUsIGFmdGVyIGRlczMsIDFkXG4gIFBhcmFsbGVsIDQgICA6ICAgICAgICAgZGVzNiwgYWZ0ZXIgZGVzNCwgMWRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ2FudHRcbiAgc2VjdGlvbiBTZWN0aW9uXG4gIENvbXBsZXRlZCA6ZG9uZSwgICAgZGVzMSwgMjAxNC0wMS0wNiwyMDE0LTAxLTA4XG4gIEFjdGl2ZSAgICAgICAgOmFjdGl2ZSwgIGRlczIsIDIwMTQtMDEtMDcsIDNkXG4gIFBhcmFsbGVsIDEgICA6ICAgICAgICAgZGVzMywgYWZ0ZXIgZGVzMSwgMWRcbiAgUGFyYWxsZWwgMiAgIDogICAgICAgICBkZXM0LCBhZnRlciBkZXMxLCAxZFxuICBQYXJhbGxlbCAzICAgOiAgICAgICAgIGRlczUsIGFmdGVyIGRlczMsIDFkXG4gIFBhcmFsbGVsIDQgICA6ICAgICAgICAgZGVzNiwgYWZ0ZXIgZGVzNCwgMWRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)

Class Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgQW5pbWFsIDx8LS0gRHVja1xuICAgIEFuaW1hbCA8fC0tIEZpc2hcbiAgICBBbmltYWwgPHwtLSBaZWJyYVxuICAgIEFuaW1hbCA6ICtpbnQgYWdlXG4gICAgQW5pbWFsIDogK1N0cmluZyBnZW5kZXJcbiAgICBBbmltYWw6ICtpc01hbW1hbCgpXG4gICAgQW5pbWFsOiArbWF0ZSgpXG4gICAgY2xhc3MgRHVja3tcbiAgICAgICtTdHJpbmcgYmVha0NvbG9yXG4gICAgICArc3dpbSgpXG4gICAgICArcXVhY2soKVxuICAgIH1cbiAgICBjbGFzcyBGaXNoe1xuICAgICAgLWludCBzaXplSW5GZWV0XG4gICAgICAtY2FuRWF0KClcbiAgICB9XG4gICAgY2xhc3MgWmVicmF7XG4gICAgICArYm9vbCBpc193aWxkXG4gICAgICArcnVuKClcbiAgICB9XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgQW5pbWFsIDx8LS0gRHVja1xuICAgIEFuaW1hbCA8fC0tIEZpc2hcbiAgICBBbmltYWwgPHwtLSBaZWJyYVxuICAgIEFuaW1hbCA6ICtpbnQgYWdlXG4gICAgQW5pbWFsIDogK1N0cmluZyBnZW5kZXJcbiAgICBBbmltYWw6ICtpc01hbW1hbCgpXG4gICAgQW5pbWFsOiArbWF0ZSgpXG4gICAgY2xhc3MgRHVja3tcbiAgICAgICtTdHJpbmcgYmVha0NvbG9yXG4gICAgICArc3dpbSgpXG4gICAgICArcXVhY2soKVxuICAgIH1cbiAgICBjbGFzcyBGaXNoe1xuICAgICAgLWludCBzaXplSW5GZWV0XG4gICAgICAtY2FuRWF0KClcbiAgICB9XG4gICAgY2xhc3MgWmVicmF7XG4gICAgICArYm9vbCBpc193aWxkXG4gICAgICArcnVuKClcbiAgICB9XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

State Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zdGF0ZURpYWdyYW1cbiAgICBbKl0gLS0-IFN0aWxsXG4gICAgU3RpbGwgLS0-IFsqXVxuICAgIFN0aWxsIC0tPiBNb3ZpbmdcbiAgICBNb3ZpbmcgLS0-IFN0aWxsXG4gICAgTW92aW5nIC0tPiBDcmFzaFxuICAgIENyYXNoIC0tPiBbKl1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zdGF0ZURpYWdyYW1cbiAgICBbKl0gLS0-IFN0aWxsXG4gICAgU3RpbGwgLS0-IFsqXVxuICAgIFN0aWxsIC0tPiBNb3ZpbmdcbiAgICBNb3ZpbmcgLS0-IFN0aWxsXG4gICAgTW92aW5nIC0tPiBDcmFzaFxuICAgIENyYXNoIC0tPiBbKl1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)

Pie Chart

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5waWUgdGl0bGUgUGV0cyBhZG9wdGVkIGJ5IHZvbHVudGVlcnNcbiAgICBcIkRvZ3NcIiA6IDM4NlxuICAgIFwiQ2F0c1wiIDogODVcbiAgICBcIlJhdHNcIiA6IDE1XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5waWUgdGl0bGUgUGV0cyBhZG9wdGVkIGJ5IHZvbHVudGVlcnNcbiAgICBcIkRvZ3NcIiA6IDM4NlxuICAgIFwiQ2F0c1wiIDogODVcbiAgICBcIlJhdHNcIiA6IDE1XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

ER Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgQ1VTVE9NRVIgfXwuLnx7IERFTElWRVJZLUFERFJFU1MgOiBoYXNcbiAgICBDVVNUT01FUiB8fC0tb3sgT1JERVIgOiBwbGFjZXNcbiAgICBDVVNUT01FUiB8fC0tb3sgSU5WT0lDRSA6IFwibGlhYmxlIGZvclwiXG4gICAgREVMSVZFUlktQUREUkVTUyB8fC0tb3sgT1JERVIgOiByZWNlaXZlc1xuICAgIElOVk9JQ0UgfHwtLXx7IE9SREVSIDogY292ZXJzXG4gICAgT1JERVIgfHwtLXx7IE9SREVSLUlURU0gOiBpbmNsdWRlc1xuICAgIFBST0RVQ1QtQ0FURUdPUlkgfHwtLXx7IFBST0RVQ1QgOiBjb250YWluc1xuICAgIFBST0RVQ1QgfHwtLW97IE9SREVSLUlURU0gOiBcIm9yZGVyZWQgaW5cIlxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgQ1VTVE9NRVIgfXwuLnx7IERFTElWRVJZLUFERFJFU1MgOiBoYXNcbiAgICBDVVNUT01FUiB8fC0tb3sgT1JERVIgOiBwbGFjZXNcbiAgICBDVVNUT01FUiB8fC0tb3sgSU5WT0lDRSA6IFwibGlhYmxlIGZvclwiXG4gICAgREVMSVZFUlktQUREUkVTUyB8fC0tb3sgT1JERVIgOiByZWNlaXZlc1xuICAgIElOVk9JQ0UgfHwtLXx7IE9SREVSIDogY292ZXJzXG4gICAgT1JERVIgfHwtLXx7IE9SREVSLUlURU0gOiBpbmNsdWRlc1xuICAgIFBST0RVQ1QtQ0FURUdPUlkgfHwtLXx7IFBST0RVQ1QgOiBjb250YWluc1xuICAgIFBST0RVQ1QgfHwtLW97IE9SREVSLUlURU0gOiBcIm9yZGVyZWQgaW5cIlxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

User Journey

[![](https://mermaid.ink/img/eyJjb2RlIjoiam91cm5leVxuICB0aXRsZSBNeSB3b3JraW5nIGRheVxuICBzZWN0aW9uIEdvIHRvIHdvcmtcbiAgICBNYWtlIHRlYTogNTogTWVcbiAgICBHbyB1cHN0YWlyczogMzogTWVcbiAgICBEbyB3b3JrOiAxOiBNZSwgQ2F0XG4gIHNlY3Rpb24gR28gaG9tZVxuICAgIEdvIGRvd25zdGFpcnM6IDU6IE1lXG4gICAgU2l0IGRvd246IDM6IE1lXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiam91cm5leVxuICB0aXRsZSBNeSB3b3JraW5nIGRheVxuICBzZWN0aW9uIEdvIHRvIHdvcmtcbiAgICBNYWtlIHRlYTogNTogTWVcbiAgICBHbyB1cHN0YWlyczogMzogTWVcbiAgICBEbyB3b3JrOiAxOiBNZSwgQ2F0XG4gIHNlY3Rpb24gR28gaG9tZVxuICAgIEdvIGRvd25zdGFpcnM6IDU6IE1lXG4gICAgU2l0IGRvd246IDM6IE1lXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)
`;

  expect(converter.mdToSVG(md)).toBe(expectSVG);
});

test("SVG to markdown format", () => {
  const SVG = `# Test

Flow Chart

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5ncmFwaCBURFxuICAgIEFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuICAgIEIgLS0-IEN7TGV0IG1lIHRoaW5rfVxuICAgIEMgLS0-fE9uZXwgRFtMYXB0b3BdXG4gICAgQyAtLT58VHdvfCBFW2lQaG9uZV1cbiAgICBDIC0tPnxUaHJlZXwgRltmYTpmYS1jYXIgQ2FyXVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5ncmFwaCBURFxuICAgIEFbQ2hyaXN0bWFzXSAtLT58R2V0IG1vbmV5fCBCKEdvIHNob3BwaW5nKVxuICAgIEIgLS0-IEN7TGV0IG1lIHRoaW5rfVxuICAgIEMgLS0-fE9uZXwgRFtMYXB0b3BdXG4gICAgQyAtLT58VHdvfCBFW2lQaG9uZV1cbiAgICBDIC0tPnxUaHJlZXwgRltmYTpmYS1jYXIgQ2FyXVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

Sequence Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zZXF1ZW5jZURpYWdyYW1cbiAgICBBbGljZS0-PitKb2huOiBIZWxsbyBKb2huLCBob3cgYXJlIHlvdT9cbiAgICBBbGljZS0-PitKb2huOiBKb2huLCBjYW4geW91IGhlYXIgbWU_XG4gICAgSm9obi0tPj4tQWxpY2U6IEhpIEFsaWNlLCBJIGNhbiBoZWFyIHlvdSFcbiAgICBKb2huLS0-Pi1BbGljZTogSSBmZWVsIGdyZWF0IVxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

Gantt Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ2FudHRcbiAgc2VjdGlvbiBTZWN0aW9uXG4gIENvbXBsZXRlZCA6ZG9uZSwgICAgZGVzMSwgMjAxNC0wMS0wNiwyMDE0LTAxLTA4XG4gIEFjdGl2ZSAgICAgICAgOmFjdGl2ZSwgIGRlczIsIDIwMTQtMDEtMDcsIDNkXG4gIFBhcmFsbGVsIDEgICA6ICAgICAgICAgZGVzMywgYWZ0ZXIgZGVzMSwgMWRcbiAgUGFyYWxsZWwgMiAgIDogICAgICAgICBkZXM0LCBhZnRlciBkZXMxLCAxZFxuICBQYXJhbGxlbCAzICAgOiAgICAgICAgIGRlczUsIGFmdGVyIGRlczMsIDFkXG4gIFBhcmFsbGVsIDQgICA6ICAgICAgICAgZGVzNiwgYWZ0ZXIgZGVzNCwgMWRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ2FudHRcbiAgc2VjdGlvbiBTZWN0aW9uXG4gIENvbXBsZXRlZCA6ZG9uZSwgICAgZGVzMSwgMjAxNC0wMS0wNiwyMDE0LTAxLTA4XG4gIEFjdGl2ZSAgICAgICAgOmFjdGl2ZSwgIGRlczIsIDIwMTQtMDEtMDcsIDNkXG4gIFBhcmFsbGVsIDEgICA6ICAgICAgICAgZGVzMywgYWZ0ZXIgZGVzMSwgMWRcbiAgUGFyYWxsZWwgMiAgIDogICAgICAgICBkZXM0LCBhZnRlciBkZXMxLCAxZFxuICBQYXJhbGxlbCAzICAgOiAgICAgICAgIGRlczUsIGFmdGVyIGRlczMsIDFkXG4gIFBhcmFsbGVsIDQgICA6ICAgICAgICAgZGVzNiwgYWZ0ZXIgZGVzNCwgMWRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)

Class Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgQW5pbWFsIDx8LS0gRHVja1xuICAgIEFuaW1hbCA8fC0tIEZpc2hcbiAgICBBbmltYWwgPHwtLSBaZWJyYVxuICAgIEFuaW1hbCA6ICtpbnQgYWdlXG4gICAgQW5pbWFsIDogK1N0cmluZyBnZW5kZXJcbiAgICBBbmltYWw6ICtpc01hbW1hbCgpXG4gICAgQW5pbWFsOiArbWF0ZSgpXG4gICAgY2xhc3MgRHVja3tcbiAgICAgICtTdHJpbmcgYmVha0NvbG9yXG4gICAgICArc3dpbSgpXG4gICAgICArcXVhY2soKVxuICAgIH1cbiAgICBjbGFzcyBGaXNoe1xuICAgICAgLWludCBzaXplSW5GZWV0XG4gICAgICAtY2FuRWF0KClcbiAgICB9XG4gICAgY2xhc3MgWmVicmF7XG4gICAgICArYm9vbCBpc193aWxkXG4gICAgICArcnVuKClcbiAgICB9XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG4gICAgQW5pbWFsIDx8LS0gRHVja1xuICAgIEFuaW1hbCA8fC0tIEZpc2hcbiAgICBBbmltYWwgPHwtLSBaZWJyYVxuICAgIEFuaW1hbCA6ICtpbnQgYWdlXG4gICAgQW5pbWFsIDogK1N0cmluZyBnZW5kZXJcbiAgICBBbmltYWw6ICtpc01hbW1hbCgpXG4gICAgQW5pbWFsOiArbWF0ZSgpXG4gICAgY2xhc3MgRHVja3tcbiAgICAgICtTdHJpbmcgYmVha0NvbG9yXG4gICAgICArc3dpbSgpXG4gICAgICArcXVhY2soKVxuICAgIH1cbiAgICBjbGFzcyBGaXNoe1xuICAgICAgLWludCBzaXplSW5GZWV0XG4gICAgICAtY2FuRWF0KClcbiAgICB9XG4gICAgY2xhc3MgWmVicmF7XG4gICAgICArYm9vbCBpc193aWxkXG4gICAgICArcnVuKClcbiAgICB9XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

State Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5zdGF0ZURpYWdyYW1cbiAgICBbKl0gLS0-IFN0aWxsXG4gICAgU3RpbGwgLS0-IFsqXVxuICAgIFN0aWxsIC0tPiBNb3ZpbmdcbiAgICBNb3ZpbmcgLS0-IFN0aWxsXG4gICAgTW92aW5nIC0tPiBDcmFzaFxuICAgIENyYXNoIC0tPiBbKl1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5zdGF0ZURpYWdyYW1cbiAgICBbKl0gLS0-IFN0aWxsXG4gICAgU3RpbGwgLS0-IFsqXVxuICAgIFN0aWxsIC0tPiBNb3ZpbmdcbiAgICBNb3ZpbmcgLS0-IFN0aWxsXG4gICAgTW92aW5nIC0tPiBDcmFzaFxuICAgIENyYXNoIC0tPiBbKl1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In19)

Pie Chart

[![](https://mermaid.ink/img/eyJjb2RlIjoiXG5waWUgdGl0bGUgUGV0cyBhZG9wdGVkIGJ5IHZvbHVudGVlcnNcbiAgICBcIkRvZ3NcIiA6IDM4NlxuICAgIFwiQ2F0c1wiIDogODVcbiAgICBcIlJhdHNcIiA6IDE1XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiXG5waWUgdGl0bGUgUGV0cyBhZG9wdGVkIGJ5IHZvbHVudGVlcnNcbiAgICBcIkRvZ3NcIiA6IDM4NlxuICAgIFwiQ2F0c1wiIDogODVcbiAgICBcIlJhdHNcIiA6IDE1XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

ER Diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgQ1VTVE9NRVIgfXwuLnx7IERFTElWRVJZLUFERFJFU1MgOiBoYXNcbiAgICBDVVNUT01FUiB8fC0tb3sgT1JERVIgOiBwbGFjZXNcbiAgICBDVVNUT01FUiB8fC0tb3sgSU5WT0lDRSA6IFwibGlhYmxlIGZvclwiXG4gICAgREVMSVZFUlktQUREUkVTUyB8fC0tb3sgT1JERVIgOiByZWNlaXZlc1xuICAgIElOVk9JQ0UgfHwtLXx7IE9SREVSIDogY292ZXJzXG4gICAgT1JERVIgfHwtLXx7IE9SREVSLUlURU0gOiBpbmNsdWRlc1xuICAgIFBST0RVQ1QtQ0FURUdPUlkgfHwtLXx7IFBST0RVQ1QgOiBjb250YWluc1xuICAgIFBST0RVQ1QgfHwtLW97IE9SREVSLUlURU0gOiBcIm9yZGVyZWQgaW5cIlxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZXJEaWFncmFtXG4gICAgQ1VTVE9NRVIgfXwuLnx7IERFTElWRVJZLUFERFJFU1MgOiBoYXNcbiAgICBDVVNUT01FUiB8fC0tb3sgT1JERVIgOiBwbGFjZXNcbiAgICBDVVNUT01FUiB8fC0tb3sgSU5WT0lDRSA6IFwibGlhYmxlIGZvclwiXG4gICAgREVMSVZFUlktQUREUkVTUyB8fC0tb3sgT1JERVIgOiByZWNlaXZlc1xuICAgIElOVk9JQ0UgfHwtLXx7IE9SREVSIDogY292ZXJzXG4gICAgT1JERVIgfHwtLXx7IE9SREVSLUlURU0gOiBpbmNsdWRlc1xuICAgIFBST0RVQ1QtQ0FURUdPUlkgfHwtLXx7IFBST0RVQ1QgOiBjb250YWluc1xuICAgIFBST0RVQ1QgfHwtLW97IE9SREVSLUlURU0gOiBcIm9yZGVyZWQgaW5cIlxuIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifX0)

User Journey

[![](https://mermaid.ink/img/eyJjb2RlIjoiam91cm5leVxuICB0aXRsZSBNeSB3b3JraW5nIGRheVxuICBzZWN0aW9uIEdvIHRvIHdvcmtcbiAgICBNYWtlIHRlYTogNTogTWVcbiAgICBHbyB1cHN0YWlyczogMzogTWVcbiAgICBEbyB3b3JrOiAxOiBNZSwgQ2F0XG4gIHNlY3Rpb24gR28gaG9tZVxuICAgIEdvIGRvd25zdGFpcnM6IDU6IE1lXG4gICAgU2l0IGRvd246IDM6IE1lXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiam91cm5leVxuICB0aXRsZSBNeSB3b3JraW5nIGRheVxuICBzZWN0aW9uIEdvIHRvIHdvcmtcbiAgICBNYWtlIHRlYTogNTogTWVcbiAgICBHbyB1cHN0YWlyczogMzogTWVcbiAgICBEbyB3b3JrOiAxOiBNZSwgQ2F0XG4gIHNlY3Rpb24gR28gaG9tZVxuICAgIEdvIGRvd25zdGFpcnM6IDU6IE1lXG4gICAgU2l0IGRvd246IDM6IE1lXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)
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

Gantt Diagram

\`\`\`mermaid
gantt
  section Section
  Completed :done,    des1, 2014-01-06,2014-01-08
  Active        :active,  des2, 2014-01-07, 3d
  Parallel 1   :         des3, after des1, 1d
  Parallel 2   :         des4, after des1, 1d
  Parallel 3   :         des5, after des3, 1d
  Parallel 4   :         des6, after des4, 1d
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

ER Diagram

\`\`\`mermaid
erDiagram
    CUSTOMER }|..|{ DELIVERY-ADDRESS : has
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o{ INVOICE : "liable for"
    DELIVERY-ADDRESS ||--o{ ORDER : receives
    INVOICE ||--|{ ORDER : covers
    ORDER ||--|{ ORDER-ITEM : includes
    PRODUCT-CATEGORY ||--|{ PRODUCT : contains
    PRODUCT ||--o{ ORDER-ITEM : "ordered in"
\`\`\`

User Journey

\`\`\`mermaid
journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 3: Me
\`\`\`
`;

  expect(converter.SVGToMd(SVG)).toBe(expectMd);
});
