import "./styles/main.css";

import Keyboard from "./keyboard";

import { createMessageByEvent, createToggleThemeButton } from "./ui";

import { insertSymbolByIndex } from "./helpers";

const wrapper = document.querySelector(".wrapper") as HTMLDivElement;

const keyboard = new Keyboard("keyboard_container", "input_field");

const textarea = document.getElementById("input_field") as HTMLTextAreaElement;

const clipboardButton = document.querySelector(".clipboard") as HTMLButtonElement;
const pasteButton = document.querySelector(".paste") as HTMLButtonElement;
createToggleThemeButton("toggle_theme_button");

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init();
});

clipboardButton.onclick = () => {
  navigator.clipboard.writeText(textarea.value);

  const previousMessage = document.querySelector(".message_dialog");
  if (previousMessage) previousMessage.remove();

  const message = createMessageByEvent("Text has copied to clipboard", 6000);

  wrapper.appendChild(message);

  message.show();
};

pasteButton.onclick = async () => {
  const textToInsert = await navigator.clipboard.readText();

  const cursorPosition = textarea.selectionStart;

  textarea.value = insertSymbolByIndex(textarea.value, cursorPosition, textToInsert);
  textarea.setSelectionRange(cursorPosition + textToInsert.length, cursorPosition + textToInsert.length);
};

// TODO: сделать так, чтобы tabindex работал вместе с фокусом на textarea (важно, чтобы был курсор)
// TODO: синхронизировать визуал с реальной клавиатурой
// TODO: добавить стрелочки и чтоб буква добавлялась там, где курсор
