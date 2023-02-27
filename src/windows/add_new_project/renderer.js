const closeWindowBtn = document.getElementById("close-window-btn");

document.getElementById("new-project-input").focus();

closeWindowBtn.addEventListener("click", () => {
  return window.API.closeWindow();
});

const addNewProjectBtn = document.getElementById("add-new-project-btn");

addNewProjectBtn.addEventListener("click", () => {
  const newProjectInputValue =
    document.getElementById("new-project-input").value;
  window.API.addNewProject(newProjectInputValue);
});
