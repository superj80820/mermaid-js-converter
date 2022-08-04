const { Replacer, CodeGenerator } = require('./pakoUtils');

class Exporter {
  constructor(dto) {
    this.dto = dto;
  }

  generateLinkEditor(code) {
    if (this.dto.link !== true) {
      return null;
    }
    const template = CodeGenerator.mermaid.compressCode(this.dto, code, true);
    return `https://mermaid.live/edit#pako:${template}`;
  }

  generateMd(link, linkUrl) {
    const image = `![](${link})`;
    if (linkUrl) {
      return `[${image}](${linkUrl})`;
    }
    return image;
  }

  generateLink(code) {
    const repository = this.dto.kroki === true ? CodeGenerator.kroki : CodeGenerator.mermaid;
    return repository.generateLink(this.dto.type, repository.compressCode(this.dto, code));
  }

  exporterItem(code) {
    code = Replacer.deleteMermaidInfo(code);
    code = Replacer.deleteNewString(code);
    const link = this.generateLink(code);
    const linkUrl = this.generateLinkEditor(code);
    return this.generateMd(link, linkUrl);
  }

  execute(fileString) {
    const matchData = fileString.match(/```mermaid(.|\n)*?```/gm);
    if (!matchData) {
      return fileString;
    }
    const outputImages = matchData.map(this.exporterItem.bind(this));
    let fileOutputString = fileString;
    matchData.forEach((item, index) => {
      fileOutputString = fileOutputString.replace(item, outputImages[index]);
    });
    return fileOutputString;
  }
}

module.exports = {
  Exporter
};
