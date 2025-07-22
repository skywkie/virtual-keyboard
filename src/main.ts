import "./style.css";
import Keyboard from "./keyboard";
import { useMessageByEvent } from "./ui";

const wrapper = document.querySelector(".wrapper") as HTMLDivElement;

const keyboard = new Keyboard("keyboard_container", "input_field");

const clipboardButton = document.querySelector(".clipboard_button") as HTMLButtonElement;

const textarea = document.getElementById("input_field") as HTMLTextAreaElement;

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init();
});

textarea.onblur = () => {
  textarea.focus();
};

clipboardButton.onclick = () => {
  navigator.clipboard.writeText(textarea.value);

  const previousMessage = document.querySelector(".message_dialog");
  previousMessage && previousMessage.remove();

  const message = useMessageByEvent("Text has copied to clipboard", 6000);

  wrapper.appendChild(message);

  message.show();
};

// TODO: сделать так, чтобы tabindex работал вместе с фокусом на textarea (важно, чтобы был курсор)
// TODO: синхронизировать визуал с реальной клавиатурой
// TODO: добавить стрелочки и чтоб буква добавлялась там, где курсор
// TODO: добавить смену темы: светлая/темная
