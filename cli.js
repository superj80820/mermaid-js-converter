const { program, Option } = require('commander');
const { Validate } = require('./validation');

const dto = {
  input: null,
  output: null,
  styleFile: null,
  styleFileContent: null,
  type: 'svg',
  kroki: false,
  link: false
};

const optionConverting = new Option('-t, --type <type>', 'type converting file').choices(['svg', 'png', 'md']);

program
  .argument('<input>', 'md file for converting')
  .argument('[output]', 'md file for save')
  .addOption(optionConverting)
  .option('--use-kroki', 'use kroki for converting')
  .option('--use-link', 'add link on live editor mermaid')
  .option('-s --style <file>', 'use style json file into mermaid')
  .parse();

const options = program.opts();
dto.input = program.args[0];
dto.output = program.args[1] || dto.input;
dto.styleFile = options?.style || null;
dto.kroki = options?.useKroki || false;
dto.link = options?.useLink || dto.link;
dto.type = options?.type || dto.type;
Validate(dto);

module.exports = {
  dto
};
