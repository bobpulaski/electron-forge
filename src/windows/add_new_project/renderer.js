const closeWindowBtn = document.getElementById("close-window-btn");
const newProjectPnput = document.getElementById("new-project-input");

document.getElementById("new-project-input").focus();

//******************************************************* */
const addNewProjectBtn = document.getElementById("add-new-project-btn");
addNewProjectBtn.addEventListener("click", () => {
  const newProjectInputValue =
    document.getElementById("new-project-input").value;
  window.API.addNewProject(newProjectInputValue);
});
//******************************************************* */

// Закрытие по кнопке окна
closeWindowBtn.addEventListener("click", () => {
  return window.API.closeWindow();
});

// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    console.log("esc");
    return window.API.closeWindow();
  }
});

// TODO Сделать кнопку скрытия панели главного меню
