const { Replacer, CodeGenerator } = require('./pakoUtils');
const trim = require('./trim');

class Importer {
  constructor(dto) {
    this.dto = dto;
  }

  clearLiveItem(string) {
    string = trim.ltrim(string, '[');
    string = string.replace(/\]\(https:\/\/mermaid\.live\/edit#pako:(.|\n)*?\)/gm, '');
    return string;
  }

  importerItem(code) {
    let link = trim.ltrim(code, '![()]');
    link = trim.rtrim(link, ')]');
    const repository = CodeGenerator.kroki.yourLink(link)
      ? CodeGenerator.kroki
      : CodeGenerator.mermaid.yourLink(link)
      ? CodeGenerator.mermaid
      : null;
    if (!repository) {
      return code;
    }
    link = link.replace(repository.generateLink('png', ''), '').replace(repository.generateLink('svg', ''), '');
    let scheme = repository.decompressCode(this.dto, link);
    scheme = Replacer.addNewString(scheme);
    scheme = Replacer.addMermaidInfo(scheme);
    return scheme;
  }

  executeDeleteLiveEditor(fileString) {
    const matchData = fileString.match(/\[(.|\n)*?\]\(https:\/\/mermaid\.live\/edit#pako:(.|\n)*?\)/gm);
    if (!matchData) {
      return fileString;
    }
    const outputSchemes = matchData.map(this.clearLiveItem.bind(this));
    let fileOutputString = fileString;
    matchData.forEach((item, index) => {
      fileOutputString = fileOutputString.replace(item, outputSchemes[index]);
    });
    return fileOutputString;
  }

  executeImportCode(fileString) {
    const matchData = fileString.match(/!\[\]\((.|\n)*?\)/gm);
    if (!matchData) {
      return fileString;
    }
    const outputSchemes = matchData.map(this.importerItem.bind(this));
    let fileOutputString = fileString;
    matchData.forEach((item, index) => {
      fileOutputString = fileOutputString.replace(item, outputSchemes[index]);
    });
    return fileOutputString;
  }

  execute(fileString) {
    fileString = this.executeImportCode(fileString);
    fileString = this.executeDeleteLiveEditor(fileString);
    return fileString;
  }
}

module.exports = {
  Importer
};
