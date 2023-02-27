function getMainMenuItems() {
  return window.API.getMainMenuData();
}

function getSubMenuItems() {
  return window.API.getSubMenuData();
}

//Load main menu
renderMainMenuItems();

function renderMainMenuItems() {
  let mainItems = "";
  let suka = "";

  let text = document.getElementById("main-menu");
  // list += `<li>${item.title} <button id="${item.id}-del" class="delete-main-menu-item-btn">-</button> <button id="${item.id}-add" class="add-sub-menu-item-btn">+</button>`;

  suka = `<ul class="headers-ul hide">`;
  getMainMenuItems().then((mainMenuData) => {
    getSubMenuItems().then((subMenuData) => {
      mainMenuData.forEach((mainItem) => {
        mainItems += `<span class="headers">${mainItem.title} (${mainItem.id})</span>`;
        subMenuData.forEach((subItem) => {
          if (mainItem.id == subItem.project_id) {
            mainItems += suka;
            mainItems += `<li>${subItem.title} (${subItem.project_id})</li>`;
            suka = "";
          } else {
            mainItems += `</ul>`;
          }
          suka = '<ul class="headers-ul hide">';
        });
      });
      text.innerHTML = mainItems;
      animateMainMenu();
    });
  });

  function animateMainMenu() {
    const h3s = document.querySelectorAll(".headers");
    h3s.forEach((h3) => {
      h3.addEventListener("click", () => {
        console.log(h3.nextElementSibling);
        h3.nextElementSibling.classList.toggle("hide");
      });
    });
  }

  const deleteMainMenuItemBtn = document.querySelectorAll(
    ".delete-main-menu-item-btn"
  );

  const addSubMenuItemBtn = document.querySelectorAll(".add-sub-menu-item-btn");

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
}

function deleteMainMenuItem(id) {
  return window.API.deleteMainMenuItem(id);
}

document.getElementById("add-new-project-btn").addEventListener("click", () => {
  return window.API.openAddNewProjectWindow();
});

// Update Main Menu Via IPC
window.API.onUpdateMenu((_event, value) => {
  renderMainMenuItems();
});
