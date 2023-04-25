import { headerTemplate, inputTemplate, buttonsTemplate } from "./htmls.js";

window.API.getSettingsToPerserWindow((event, message) => {
  document.getElementById("place-header").innerHTML = headerTemplate(
    message.parserWindowArgs
  );

  document.getElementById("place-input-parser").innerHTML = inputTemplate(
    message.parserWindowArgs
  );

  document.getElementById("place-buttons").innerHTML = buttonsTemplate(
    message.parserWindowArgs
  );

  const addNewParserBtn = document.getElementById("add-new-parser-btn");
  const parserInput = document.getElementById("parser-input");

  addNewParserBtn.addEventListener("click", () => {
    let projectId = addNewParserBtn.dataset.projectid;
    let parserInputValue = parserInput.value;
    return window.API.addNewParser(projectId, parserInputValue);
  });

  // Закрытие окна по кнопке
  document.getElementById("close-window-btn").addEventListener("click", () => {
    return window.API.closeParserWindow();
  });
});

// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    return window.API.closeParserWindow();
  }
});
