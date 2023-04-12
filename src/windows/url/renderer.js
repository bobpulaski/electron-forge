import { headerTmplate, inputTemplate, buttonsTemplate } from "./htmls.js";

// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    return window.API.closeUrlWindow();
  }
});

// Рендер заголовка, поля ввода и присвоение кнопки id парсера
window.API.sendSettings((event, settings) => {
  document.getElementById("place-header").innerHTML = headerTmplate(
    settings.windowMode
  );

  document.getElementById("place-input-url").innerHTML = inputTemplate(
    settings.windowMode,
    settings.urlTitle
  );
  document.getElementById("url-input").focus();

  document.getElementById("place-buttons").innerHTML = buttonsTemplate(
    settings.windowMode
  );

  const addNewUrlBtn = document.getElementById("add-new-url-btn");
  const editUrlBtn = document.getElementById("edit-url-btn");

  if (addNewUrlBtn) {
    // Обработка нажатия кнопки создать
    document.getElementById("add-new-url-btn").dataset.parserid =
      settings.parserId;
    document
      .getElementById("add-new-url-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        const urlInputValue = document.getElementById("url-input").value.trim();

        const parserId =
          document.getElementById("add-new-url-btn").dataset.parserid;
        window.API.addNewUrl(parserId, urlInputValue);
      });
  }

  if (editUrlBtn) {
    document.getElementById("edit-url-btn").addEventListener("click", (e) => {
      e.preventDefault();
      const urlId = settings.urlId;
      const urlInputValue = document.getElementById("url-input").value.trim();
      const parserId = settings.parserId;
      console.log(parserId);
      window.API.updateUrl(urlInputValue, urlId, parserId);
    });
  }

  // Закрытие окна по кнопке
  document.getElementById("close-window-btn").addEventListener("click", () => {
    return window.API.closeUrlWindow();
  });
});

//************************************************** */
