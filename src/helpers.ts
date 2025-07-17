const numbers = [];
for (let i = 1; i < 10; i++) {
  numbers.push(i.toString());
}

const firstKeyboardString = ["`", ...numbers, "0", "backspace"];

export { firstKeyboardString };
