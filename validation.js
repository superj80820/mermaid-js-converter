const fs = require('fs');

function fileExist(path) {
  if (!fs.existsSync(path)) {
    throw Error(`Path: ${path} is not exists`);
  }
}

function fileValidJson(path) {
  const rawdata = fs.readFileSync(path);
  return JSON.parse(rawdata);
}

function Validate(dto) {
  fileExist(dto.input);
  if (dto.styleFile) {
    fileExist(dto.styleFile);
    dto.styleFileContent = fileValidJson(dto.styleFile);
  }
  return true;
}

module.exports = {
  Validate
};
