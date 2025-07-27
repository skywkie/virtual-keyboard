import { useToggleTheme } from "./hooks";

const createToggleThemeButton = () => {
  const themeToggleButton = document.createElement("button");
  themeToggleButton.id = "theme_toggle_button";

  const { toggleTheme } = useToggleTheme();

  themeToggleButton.onclick = () => toggleTheme();

  return themeToggleButton;
};

const createMessageByEvent = (text: string, timeout: number) => {
  const message = document.createElement("dialog");
  const messageText = document.createElement("p");

  message.className = "message_dialog";

  message.style.animationDuration = `${timeout / 1000}s`;

  messageText.textContent = text;

  message.appendChild(messageText);

  setTimeout(() => {
    message.remove();
  }, timeout);

  return message;
};

export { createMessageByEvent, createToggleThemeButton };
