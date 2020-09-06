const Base64 = require("js-base64");

function mdToSVG(data) {
  const matchData = data.match(/```mermaid(.|\n)*?```/gm);

  const jsonStrings = matchData
    .map((item) => item.replace("```mermaid", "").replace("```", ""))
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
    const { code } = JSON.parse(Base64.decode(encodedURIs[index]));
    originMd = originMd.replace(item, "```mermaid" + code + "```\n");
  });

  return originMd;
}

module.exports = {
  mdToSVG,
  SVGToMd,
};
