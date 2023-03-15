function getMainMenuItems() {
  return window.API.getMainMenuItems();
}

function getSubMenuItems() {
  return window.API.getSubMenuItems();
}

//Load main menu
renderMainMenuItems();

function deleteMainMenuItem(id) {
  return window.API.deleteMainMenuItem(id);
}

document.getElementById("add-new-project-btn").addEventListener("click", () => {
  return window.API.openAddNewProjectWindow();
});

// Update Main Menu Via IPC
window.API.onUpdateMenu((_event, value) => {
  renderMainMenuItems();
  sweetAlert({ title: "The project has just been created", icon: "success" });
});

//const addSubMenuItemBtn = document.querySelectorAll(".add-sub-menu-item-btn");

//   deleteMainMenuItemBtn.forEach((elem) => {
//     elem.addEventListener("click", () => {
//       deleteMainMenuItem(elem.id.replace("-del", ""));
//       renderMainMenuItems();
//     });
//   });

//   addSubMenuItemBbtn.forEach((elem) => {
//     elem.addEventListener("click", () => {
//       addSubMenuItemBtn(elem.id.replace("-add", ""));
//     });
//   });
// });
