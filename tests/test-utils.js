const fs = require('fs');
const memorized = {};

function TestCase(path) {
  if (!memorized[path]) {
    memorized[path] = fs.readFileSync(`tests/${path}`).toString();
  }
  return memorized[path];
}

module.exports = {
  TestCase
};
