function rtrim(x, characters) {
  let start = 0;
  let end = x.length - 1;
  while (characters.indexOf(x[end]) >= 0) {
    end -= 1;
  }
  return x.substring(start, end + 1);
}

function ltrim(x, characters) {
  let start = 0;
  while (characters.indexOf(x[start]) >= 0) {
    start += 1;
  }
  return x.substring(start);
}

module.exports = { rtrim, ltrim };
