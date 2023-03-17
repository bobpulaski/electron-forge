// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    console.log("45");
    return window.API.closeAddNewParserWindow();
  }
});

console.log("434");
