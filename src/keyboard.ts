import { firstKeyboardString } from "./helpers";

class Keyboard {
  keyboardContainer: HTMLDivElement;
  inputField: HTMLTextAreaElement;

  userLanguage: string;
  readonly languages = {
    enKeys: [
      firstKeyboardString,
      ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "del"],
      ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
      ["change language", "space"],
    ],
    ruKeys: [
      firstKeyboardString,
      ["tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "del"],
      ["caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter"],
      ["shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?"],
      ["change language", "space"],
    ],
  };

  isShiftPressed = false;
  isCapsPressed = false;

  constructor(keyboardContainerId: string, inputFieldId: string) {
    this.keyboardContainer = document.getElementById(keyboardContainerId)! as HTMLDivElement;
    this.inputField = document.getElementById(inputFieldId)! as HTMLTextAreaElement;

    this.userLanguage = navigator.language;
  }
  init() {
    this.renderKeyboard();
  }
  renderKeyboard() {
    const fragment = document.createDocumentFragment();
    const keys = this.userLanguage === "ru-RU" ? this.languages.ruKeys : this.languages.enKeys;
    keys.forEach((keyRow) => {
      const keyboardRow = document.createElement("div");
      keyboardRow.className = "keyboard_row";
      keyRow.forEach((key) => {
        const keyElement = document.createElement("button");
        keyElement.innerText = key;
        keyElement.classList = `key_row_element ${key}`;
        keyElement.onclick = () => this.handleClick(key);
        keyboardRow.appendChild(keyElement);
        fragment.appendChild(keyboardRow);
      });
    });
    this.keyboardContainer.appendChild(fragment);
  }
  handleClick(key: string) {
    const shiftButton: HTMLButtonElement =
      document.querySelector(".shift")! || document.querySelector(".shift_pressed")!;
    const capsButton: HTMLButtonElement =
      document.querySelector(".caps")! || document.querySelector(".caps_pressed")!;

    const toggleShift = () => {
      this.isShiftPressed
        ? shiftButton.classList.replace("shift_pressed", "shift")
        : shiftButton.classList.replace("shift", "shift_pressed");

      this.isShiftPressed = !this.isShiftPressed;
    };
    const toggleCaps = () => {
      this.isCapsPressed
        ? capsButton.classList.replace("caps_pressed", "caps")
        : capsButton.classList.replace("caps", "caps_pressed");
      this.isCapsPressed = !this.isCapsPressed;
    };

    switch (key) {
      case "backspace":
        this.inputField.value = this.inputField.value.slice(0, -1);
        break;
      case "tab":
        this.inputField.value += "	";
        break;
      case "del":
        this.inputField.value = "";
        break;
      case "shift":
        toggleShift();
        break;
      case "caps":
        toggleCaps();
        break;
      default:
        if (this.isShiftPressed) {
          toggleShift();
          this.inputField.value += key.toUpperCase();
          break;
        }
        if (this.isCapsPressed) {
          this.inputField.value += key.toUpperCase();
          break;
        }
        this.inputField.value += key;
        break;
    }
  }
}

export default Keyboard;
