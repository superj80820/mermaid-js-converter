#! /usr/bin/env node

const fs = require("fs");
const converter = require("./converter");
const Result = require("folktale/result");

function getArgs(arguments) {
  let argObj = {
    "-f": null, // String
    "-o": null, // String
    isValuesExsit() {
      return this["-f"] && this["-o"];
    },
  };
  arguments.forEach((item, index) => {
    switch (item) {
      case "-f":
        argObj["-f"] = arguments[index + 1];
        break;
      case "-o":
        argObj["-o"] = arguments[index + 1];
        break;
    }
  });
  return argObj;
}

try {
  const argObj = getArgs(process.argv);
  if (!argObj.isValuesExsit()) {
    console.error(
      `Arguments error. Please fill in the file name and format.\n\ne.g: 'mermaidConverter -f ./myMD.md -o md'\n\n - f: File name\n - o: Output format\n      md: SVG to markdown\n      SVG: Markdown to SVG`
    );
    return;
  }
  const mdFileString = fs.readFileSync(argObj["-f"], "utf8");

  const convertedMdFileString = Result.try((_) =>
    ((output, mdString) => {
      let convertedResult;
      switch (output) {
        case "md":
          console.log("Convert to markdown");
          convertedResult = converter.SVGToMd(mdString);
          break;
        case "SVG":
          console.log("Convert to SVG");
          convertedResult = converter.mdToSVG(mdString);
          break;
        default:
          console.warn(
            "No matching conversion output format found, so no conversion"
          );
          convertedResult = mdString;
      }
      return convertedResult;
    })(argObj["-o"], mdFileString)
  );

  if (convertedMdFileString.getOrElse(null) === null) {
    console.error(
      "Conversion error. Could it be a format error:\n",
      convertedMdFileString.value
    );
    return;
  }
  fs.writeFileSync(argObj["-f"], convertedMdFileString.getOrElse(null));
} catch (err) {
  console.error("Unknown error:\n", err);
}
