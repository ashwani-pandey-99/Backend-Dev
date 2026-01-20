const utils = require("./stringUtils");

const text = "hello ashwani";

console.log("Original:", text);
console.log("Capitalized:", utils.capitalize(text));
console.log("Reversed:", utils.reverseString(text));
console.log("Vowel Count:", utils.countVowels(text));
