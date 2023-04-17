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
  sweetAlert({ title: "The project has just been created", icon: "success" });
  renderMainMenuItems();
});

// Update Urls Table Via IPC, эмулируя клик по пункту меню
window.API.onUpdateUrlsTable(async (_event, parserId, mode) => {
  await document.querySelector(`[data-parserid="${parserId}"]`).click();
  if (mode === "add") {
    sweetAlert({ title: "The URL has just been created", icon: "success" });
  }
  if (mode === "edit") {
    sweetAlert({ title: "The URL has just been updated", icon: "success" });
  }
  if (mode === "delete-url") {
    sweetAlert({ title: "The URL has just been deleted", icon: "success" });
  }
});

function sweetAlert({ title, icon }) {
  Swal.fire({
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 2500,
    backdrop: false,
    // width: 300,
    customClass: "swal",
  });
}

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
