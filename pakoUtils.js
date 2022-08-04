const pako = require('pako');
const { fromUint8Array, toUint8Array } = require('js-base64');

class PakoUtils {
  static serialize(f) {
    const k = new TextEncoder().encode(f);
    const h = pako.deflate(k, { level: 9 });
    return fromUint8Array(h, !0);
  }

  static deserialize(f) {
    const k = toUint8Array(f);
    return pako.inflate(k, {
      to: 'string'
    });
  }
}

class replacementFieldsUtils {
  constructor() {
    this.replacementFields = ['class', 'gantt', 'erDiagram', 'journey'];
    this.replacementNewLineFields = this.replacementFields.map((field) => `\n${field}`);
  }

  deleteMermaidInfo(item) {
    return item.replace('```mermaid', '').replace('```', '');
  }

  deleteNewString(item) {
    const condition = this.replacementNewLineFields.some((field) => item.startsWith(field));
    return condition ? item.substring(1) : item;
  }

  addMermaidInfo(item) {
    return `\`\`\`mermaid${item}\`\`\``;
  }

  addNewString(item) {
    const condition = this.replacementFields.some((field) => item.startsWith(field));
    return condition ? `\n${item}` : item;
  }
}

const Replacer = new replacementFieldsUtils();

const CodeGenerator = {
  mermaid: {
    compressCode: (dto, code, withPreview = false) => {
      const config = dto.styleFileContent || {
        theme: 'default'
      };
      const payload = {
        updateEditor: withPreview,
        autoSync: withPreview,
        updateDiagram: withPreview,
        code: code,
        mermaid: config
      };
      const stringPayload = JSON.stringify(payload);
      return PakoUtils.serialize(stringPayload);
    },
    decompressCode: (dto, code) => {
      const stringPayload = PakoUtils.deserialize(code);
      const payload = JSON.parse(stringPayload);
      return payload?.code;
    },
    generateLink: (type, code) => {
      const typeUrl = type === 'png' ? 'img' : 'svg';
      return `https://mermaid.ink/${typeUrl}/pako:${code}`;
    },
    yourLink: (link) => {
      return link.startsWith('https://mermaid.ink');
    }
  },
  kroki: {
    compressCode: (dto, code) => {
      return PakoUtils.serialize(code);
    },
    decompressCode: (dto, code) => {
      return PakoUtils.deserialize(code);
    },
    generateLink: (type, code) => {
      return `https://kroki.io/mermaid/${type}/${code}`;
    },
    yourLink: (link) => {
      return link.startsWith('https://kroki.io/mermaid');
    }
  }
};

module.exports = { CodeGenerator, Replacer };
