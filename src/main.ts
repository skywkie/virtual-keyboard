import "./style.css";
import Keyboard from "./keyboard";

const keyboard = new Keyboard("keyboard_container", "input_field");

window.addEventListener("DOMContentLoaded", () => {
  keyboard.init();
});
