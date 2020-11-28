function titleCase(word) {
  let restOfWord = word.slice(1);
  let firstLetter = word.substr(0, 1);
  firstLetter = firstLetter.toUpperCase();
  let merge = firstLetter + restOfWord;
  return merge;
}
export default titleCase