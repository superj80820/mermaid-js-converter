const { TestCase } = require('./test-utils');
const { Exporter } = require('../exporter');
const { Importer } = require('../importer');

let cases = [
  {
    name: 'Case svg without link',
    fileIn: TestCase('example.md'),
    fileOut: TestCase('svg-no-link.md'),
    dto: {
      styleFileContent: null,
      type: 'svg',
      kroki: false,
      link: false
    }
  },
  {
    name: 'Case svg with link',
    fileIn: TestCase('example.md'),
    fileOut: TestCase('svg-link.md'),
    dto: {
      styleFileContent: null,
      type: 'svg',
      kroki: false,
      link: true
    }
  },
  {
    name: 'Case png with link',
    fileIn: TestCase('example.md'),
    fileOut: TestCase('png-no-link.md'),
    dto: {
      styleFileContent: null,
      type: 'png',
      kroki: false,
      link: false
    }
  },
  {
    name: 'Case png without link',
    fileIn: TestCase('example.md'),
    fileOut: TestCase('png-link.md'),
    dto: {
      styleFileContent: null,
      type: 'png',
      kroki: false,
      link: true
    }
  }
];
describe('Markdown to Mermaid format', () =>
  cases.forEach((test) => {
    it(test.name, () => {
      const out = new Exporter(test.dto).execute(test.fileIn);
      expect(out).toBe(test.fileOut);
    });
  }));

describe('Mermaid to Markdown format', () =>
  cases.forEach((test) => {
    it(test.name, () => {
      const out = new Importer(test.dto).execute(test.fileOut);
      expect(out).toBe(test.fileIn);
    });
  }));

cases = [
  {
    name: 'Case Kroki svg without link',
    fileIn: TestCase('example.md'),
    fileOut: TestCase('kroki-svg-no-link.md'),
    dto: {
      styleFileContent: null,
      type: 'svg',
      kroki: true,
      link: false
    }
  },
  {
    name: 'Case Kroki svg with link',
    fileIn: TestCase('example.md'),
    fileOut: TestCase('kroki-svg-link.md'),
    dto: {
      styleFileContent: null,
      type: 'svg',
      kroki: true,
      link: true
    }
  },
  {
    name: 'Case Kroki png with link',
    fileIn: TestCase('example.md'),
    fileOut: TestCase('kroki-png-no-link.md'),
    dto: {
      styleFileContent: null,
      type: 'png',
      kroki: true,
      link: false
    }
  },
  {
    name: 'Case Kroki png without link',
    fileIn: TestCase('example.md'),
    fileOut: TestCase('kroki-png-link.md'),
    dto: {
      styleFileContent: null,
      type: 'png',
      kroki: true,
      link: true
    }
  }
];

describe('Markdown to Kroki format', () =>
  cases.forEach((test) => {
    it(test.name, () => {
      const out = new Exporter(test.dto).execute(test.fileIn);
      expect(out).toBe(test.fileOut);
    });
  }));

describe('Kroki to Markdown format', () =>
  cases.forEach((test) => {
    it(test.name, () => {
      const out = new Importer(test.dto).execute(test.fileOut);
      expect(out).toBe(test.fileIn);
    });
  }));

cases = {
  fileIn: TestCase('example.md'),
  fileOut: TestCase('mermaid-and-style.md'),
  dto: {
    styleFileContent: {
      theme: 'dark'
    },
    type: 'svg',
    kroki: false,
    link: true
  }
};
it('Markdown to Mermaid Style format', () => {
  const out = new Exporter(cases.dto).execute(cases.fileIn);
  expect(out).toBe(cases.fileOut);
});

it('Mermaid to Markdown Style format', () => {
  const out = new Importer(cases.dto).execute(cases.fileOut);
  expect(out).toBe(cases.fileIn);
});
