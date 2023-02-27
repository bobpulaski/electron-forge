function getMainMenuItems() {
  return window.API.getMainMenuData();
}

function getSubMenuItems() {
  return window.API.getSubMenuData();
}

//Load main menu
renderMainMenuItems();

function renderMainMenuItems() {
  let mainItem = "";
  let subItem = "";
  let allItems = "";

  let text = document.getElementById("main-menu");
  let jopa = document.getElementById("jopa");

  getMainMenuItems().then((mainMenuData) => {
    mainMenuData.forEach((item) => {
      // list += `<li>${item.title} <button id="${item.id}-del" class="delete-main-menu-item-btn">-</button> <button id="${item.id}-add" class="add-sub-menu-item-btn">+</button>`;
      mainItem += `<span class="headers">${item.title} (${item.id})</span>`;

      getSubMenuItems().then((subMenuData) => {
        subMenuData.forEach((item) => {
          //mainItem += `<li>${item.title}</li>`;
        });
      });
    });

    text.innerHTML = mainItem;

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

document.getElementById("add-new-project-btn").addEventListener("click", () => {
  window.API.openAddNewProjectWindow().then(() => {});
});

// Update Main Menu Via IPC
window.API.onUpdateMenu((_event, value) => {
  renderMainMenuItems();
});
