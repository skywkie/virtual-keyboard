const numbers = [];
for (let i = 1; i < 10; i++) {
  numbers.push(i.toString());
}

const firstKeyboardString = ["`", ...numbers, "0", "-", "+", "backspace"];

// prettier-ignore
const upperLowerLetters = [
	"q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d",
	"f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m",
	"й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х",
	"ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж",
	"э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю"
];

const insertSymbolByIndex = (str: string, index: number, char: string) => {
  const strArray = str.split("");

  strArray.splice(index, 0, char);

  return strArray.join("");
};

const removeSymbolByIndex = (str: string, index: number) => {
  return str.substring(0, index-1) + str.substring(index);
};

const isUpperLowerLetter = (key: string) => upperLowerLetters.includes(key);

export { firstKeyboardString, insertSymbolByIndex, removeSymbolByIndex, isUpperLowerLetter };
