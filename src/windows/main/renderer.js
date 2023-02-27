function getMainMenuItems() {
  return window.API.getMainMenuData();
}

//Load main menu
renderMainMenuItems();

function renderMainMenuItems() {
  let list = "";
  let text = document.getElementById("main-menu");
  getMainMenuItems().then((mainMenuData) => {
    mainMenuData.forEach((item) => {
      list += `<li>${item.title} <button id="${item.id}-del" class="delete-main-menu-item-btn">-</button> <button id="${item.id}-add" class="add-sub-menu-item-btn">+</button>`;
    });
    text.innerHTML = list;
    const deleteMainMenuItemBtn = document.querySelectorAll(
      ".delete-main-menu-item-btn"
    );
    const addSubMenuItemBbtn = document.querySelectorAll(
      ".add-sub-menu-item-btn"
    );

    deleteMainMenuItemBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        deleteMainMenuItem(elem.id.replace("-del", ""));
        renderMainMenuItems();
      });
    });
    addSubMenuItemBbtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        addSubMenuItemBtn(elem.id.replace("-add", ""));
      });
    });
  });
}

function deleteMainMenuItem(id) {
  return window.API.deleteMainMenuItem(id);
}

document
  .getElementById("add-new-project-btn")
  .addEventListener("click", () => {
    window.API.openAddNewProjectWindow().then(() => {});
  });

// Update Main Menu Via IPC
window.API.onUpdateMenu((_event, value) => {
  renderMainMenuItems();
});
