function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function countVowels(str) {
  let count = 0;
  const vowels = "aeiouAEIOU";

  for (let ch of str) {
    if (vowels.includes(ch)) count++;
  }
  return count;
}

module.exports = { capitalize, reverseString, countVowels };
