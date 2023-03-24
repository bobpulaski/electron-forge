// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    return window.API.closeUrlWindow();
  }
});

document.getElementById("close-window-btn").addEventListener("click", () => {
  return window.API.closeUrlWindow();
});

window.API.sendSettings((event, settings) => {
  console.log(settings.windowMode);
});

document.getElementById("new-url-input").focus();
