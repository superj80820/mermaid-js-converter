const Base64 = require("js-base64");

function mdToSVG(data) {
  const matchData = data.match(/```mermaid(.|\n)*?```/gm);

  const jsonStrings = matchData
    .map((item) => item.replace("```mermaid", "").replace("```", ""))
    // Workaround for classdiagram
    .map((item) =>
      item.startsWith("\nclass") ||
      item.startsWith("\ngantt") ||
      item.startsWith("\nerDiagram") ||
      item.startsWith("\njourney")
        ? item.substr(1, item.length - 1)
        : item
    )
    .map((item) =>
      JSON.stringify({
        code: item,
        mermaid: {
          theme: "default",
        },
      })
    )
    .map((item) => {
      const jsonString = Base64.encodeURI(item);
      return `[![](https://mermaid.ink/img/${jsonString})](https://mermaid-js.github.io/mermaid-live-editor/#/edit/${jsonString})`;
    });

  let changeMd = data;
  matchData.forEach((item, index) => {
    changeMd = changeMd.replace(item, jsonStrings[index]);
  });

  return changeMd;
}

function SVGToMd(data) {
  const matchData = data.match(
    /\[\!\[\]\(https:\/\/mermaid\.ink\/img\/(.|\n)*?\)\n/gm
  );

  const encodedURIs = matchData.map((item) => {
    item = item.replace("[![](https://mermaid.ink/img/", "");
    return item.substr(
      0,
      item.indexOf(")](https://mermaid-js.github.io/mermaid-live-editor/#/")
    );
  });

  let originMd = data;

  matchData.forEach((item, index) => {
    // Workaround for classdiagram about assignment let
    let { code } = JSON.parse(Base64.decode(encodedURIs[index]));
    // Workaround for classdiagram
    if (
      code.startsWith("class") ||
      code.startsWith("gantt") ||
      code.startsWith("erDiagram") ||
      code.startsWith("journey")
    )
      code = `\n${code}`;
    originMd = originMd.replace(item, "```mermaid" + code + "```\n");
  });

  return originMd;
}

module.exports = {
  mdToSVG,
  SVGToMd,
};
