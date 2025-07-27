import { useToggleTheme } from "./hooks";

const createToggleThemeButton = (buttonId: string) => {
  // TODO: проверка на отсутствие элемента с таким классом
  const themeToggleButton = document.getElementById(buttonId) as HTMLButtonElement;

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
