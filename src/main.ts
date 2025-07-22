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

// TODO: сделать так, чтобы tabindex работал вместе с фокусом на textarea (важно, чтобы был курсор)
// TODO: синхронизировать визуал с реальной клавиатурой
// TODO: добавить стрелочки и чтоб буква добавлялась там, где курсор
// TODO: создать кнопку для копирования текста
// TODO: добавить смену темы: светлая/темная
