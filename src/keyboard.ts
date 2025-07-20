import { firstKeyboardString, isUpperLowerLetter } from "./helpers";
import type { HTMLCollectionOf } from "./types";

class Keyboard {
  keyboardContainer: HTMLDivElement;
  inputField: HTMLTextAreaElement;

  userLanguage: string;
  readonly languages = {
    enKeys: [
      firstKeyboardString,
      ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "del"],
      ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift"],
      ["language", "space"],
    ],
    ruKeys: [
      firstKeyboardString,
      ["tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "del"],
      ["caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter"],
      ["shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?", "shift"],
      ["language", "space"],
    ],
  };

  isShiftPressed = false;
  isCapsPressed = false;

  constructor(keyboardContainerId: string, inputFieldId: string) {
    // TODO: проверка на существование данных элементов во избежание ошибок, если класс указан неверно
    this.keyboardContainer = document.getElementById(keyboardContainerId)! as HTMLDivElement;
    this.inputField = document.getElementById(inputFieldId)! as HTMLTextAreaElement;

    this.userLanguage = navigator.language;
  }
  init() {
    this.renderKeyboard(this.isShiftPressed, this.isShiftPressed);
  }
  renderKeyboard(isShiftPressed: boolean = false, isCapsPressed: boolean = false) {
    const keyboard = document.createElement("div");
    keyboard.id = "keyboard";

    const fragment = document.createDocumentFragment();

    const keys = this.userLanguage === "ru-RU" ? this.languages.ruKeys : this.languages.enKeys;

    keys.forEach((keyRow) => {
      const keyboardRow = document.createElement("div");

      keyboardRow.className = "keyboard_row";

      keyRow.forEach((key) => {
        const keyElement = document.createElement("button");

        (isShiftPressed || isCapsPressed) && isUpperLowerLetter(key)
          ? (keyElement.innerText = key.toUpperCase())
          : (keyElement.innerText = key);

        keyElement.classList = `key_row_element ${key}`;

        key === "shift" && isShiftPressed && keyElement.classList.add("pressed");
        key === "caps" && isCapsPressed && keyElement.classList.add("pressed");

        keyElement.onclick = () => this.handleClick(key);

        keyboardRow.appendChild(keyElement);
      });
      fragment.appendChild(keyboardRow);
    });

    keyboard.appendChild(fragment);

    this.keyboardContainer.appendChild(keyboard);
  }
  reRenderKeyboard(isShiftPressed: boolean, isCapsPressed: boolean) {
    this.closeKeyboard();
    this.renderKeyboard(isShiftPressed, isCapsPressed);
  }

  closeKeyboard() {
    const keyboard = document.getElementById("keyboard") as HTMLDivElement;
    keyboard.remove();
  }

  handleClick(key: string) {
    const toggleShift = () => {
      this.isShiftPressed = !this.isShiftPressed;
      this.reRenderKeyboard(this.isShiftPressed, this.isCapsPressed); // !!!!!!!!!!!
    };

    const toggleCaps = () => {
      this.isCapsPressed = !this.isCapsPressed;
      this.reRenderKeyboard(this.isShiftPressed, this.isCapsPressed);
    };

    const toggleLanguage = () => {
      this.userLanguage === "ru-RU" ? (this.userLanguage = "en-EN") : (this.userLanguage = "ru-RU");
      this.reRenderKeyboard(this.isShiftPressed, this.isCapsPressed);
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
      case "enter":
        this.inputField.value += "\n";
        break;
      case "caps":
        toggleCaps();
        break;
      case "shift":
        toggleShift();
        break;
      case "language":
        toggleLanguage();
        break;
      case "space":
        this.inputField.value += " ";
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
