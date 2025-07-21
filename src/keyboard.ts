import {
  firstKeyboardString,
  insertSymbolByIndex,
  isUpperLowerLetter,
  removeSymbolByIndex,
} from "./helpers";
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
    this.renderKeyboard(this.isShiftPressed, this.isShiftPressed, -1);
  }
  renderKeyboard(
    isShiftPressed: boolean = false,
    isCapsPressed: boolean = false,
    cursorPosition: number = -1
  ) {
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

    this.inputField.setSelectionRange(cursorPosition, cursorPosition);
  }

  reRenderKeyboard(isShiftPressed: boolean, isCapsPressed: boolean, cursorPosition: number) {
    this.closeKeyboard();
    this.renderKeyboard(isShiftPressed, isCapsPressed, cursorPosition);
  }

  closeKeyboard() {
    const keyboard = document.getElementById("keyboard") as HTMLDivElement;
    keyboard.remove();
  }

  handleClick(key: string) {
    const cursorPosition = this.inputField.selectionStart;

    const toggleShift = () => {
      this.isShiftPressed = !this.isShiftPressed;
      this.reRenderKeyboard(this.isShiftPressed, this.isCapsPressed, cursorPosition); // !!!!!!!!!!!
    };

    const toggleCaps = () => {
      this.isCapsPressed = !this.isCapsPressed;
      this.reRenderKeyboard(this.isShiftPressed, this.isCapsPressed, cursorPosition);
    };

    const toggleLanguage = () => {
      this.userLanguage === "ru-RU" ? (this.userLanguage = "en-EN") : (this.userLanguage = "ru-RU");
      this.reRenderKeyboard(this.isShiftPressed, this.isCapsPressed, cursorPosition);
    };

    const removeSymbolFromInputField = () => {
      this.inputField.value = removeSymbolByIndex(this.inputField.value, cursorPosition);
      this.inputField.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    };

    const addSymbolToInputField = (key: string) => {
      this.inputField.value = insertSymbolByIndex(this.inputField.value, cursorPosition, key);
      this.inputField.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    };

    switch (key) {
      case "backspace":
        removeSymbolFromInputField();
        break;
      case "tab":
        addSymbolToInputField("	");
        break;
      case "del":
        this.inputField.value = "";
        break;
      case "enter":
        addSymbolToInputField("\n");
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
          addSymbolToInputField(key.toUpperCase());
          break;
        }
        if (this.isCapsPressed) {
          addSymbolToInputField(key.toUpperCase());
          break;
        }
        addSymbolToInputField(key);
        break;
    }
  }
}

export default Keyboard;
