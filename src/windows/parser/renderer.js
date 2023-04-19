import { headerTemplate, inputTemplate } from "./htmls.js";

// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    return window.API.closeParserWindow();
  }
});

window.API.getSettingsToPerserWindow((event, message) => {
  document.getElementById("place-header").innerHTML = headerTemplate(
    message.parserWindowArgs
  );

  document.getElementById("place-input-parser").innerHTML = inputTemplate(
    message.parserWindowArgs
  );
});
