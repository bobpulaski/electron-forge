import { headerTmplate } from "./htmls.js";

document.getElementById("new-url-input").focus();

// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    return window.API.closeUrlWindow();
  }
});

// Закрытие окна по кнопке
document.getElementById("close-window-btn").addEventListener("click", () => {
  return window.API.closeUrlWindow();
});

// Рендер заголовка
window.API.sendSettings((event, settings) => {
  document.getElementById("header").innerHTML = headerTmplate(
    settings.windowMode
  );
  document.getElementById("add-new-url-btn").dataset.parserid =
    settings.parserId;
});

// Обработка нажатия кнопки создать
document.getElementById("add-new-url-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const newUrlInputValue = document
    .getElementById("new-url-input")
    .value.trim();
  const parserId = document.getElementById("add-new-url-btn").dataset.parserid;
  window.API.addNewUrl(parserId, newUrlInputValue);
});
