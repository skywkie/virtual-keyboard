import "./style.css";
import Keyboard from "./keyboard";

const keyboard = new Keyboard("keyboard_container", "input_field");

const textarea = document.getElementById("input_field") as HTMLTextAreaElement;

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init();
});

textarea.addEventListener("blur", () => {
  textarea.focus();
});

// TODO: синхронизировать с реальной клавиатурой
// TODO: добавить стрелочки и чтоб буква добавлялась там, где курсор
