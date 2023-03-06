function renderMainMenuItems() {
  let mainItems = "";
  let text = document.getElementById("main-menu");
  // list += `<li>${item.title} <button id="${item.id}-del" class="delete-main-menu-item-btn">-</button> <button id="${item.id}-add" class="add-sub-menu-item-btn">+</button>`;
  getMainMenuItems().then((mainMenuData) => {
    getSubMenuItems().then((subMenuData) => {
      mainMenuData.forEach((mainItem) => {
        mainItems += `<span class="headers has-text-white p-4 left">${mainItem.title}<i class="arrow"></i></span><ul class="headers-ul hide">`;
        subMenuData.forEach((subItem) => {
          if (mainItem.id == subItem.project_id) {
            mainItems += `<li class="sub-menu-item" data-projectid="${subItem.id}">${subItem.title}</li>`;
          }
        });
        mainItems += `</ul>`;
      });
      text.innerHTML = mainItems;
      animateMainMenu();
      parserMenuAction();
    });
  });

  function animateMainMenu() {
    const h3s = document.querySelectorAll(".headers");
    const arrows = document.querySelectorAll(".arrow");
    h3s.forEach((h3) => {
      h3.addEventListener("click", () => {
        h3.firstElementChild.classList.toggle("arrow-rotate");
        h3s.forEach((h3) => {
          h3.classList.remove("active-menu-item");
        });
        h3.classList.toggle("active-menu-item");
        h3.nextElementSibling.classList.toggle("hide");
      });
    });
  }

  const deleteMainMenuItemBtn = document.querySelectorAll(
    ".delete-main-menu-item-btn"
  );

  const addSubMenuItemBtn = document.querySelectorAll(".add-sub-menu-item-btn");

  function parserMenuAction() {
    const subMenuItems = document.querySelectorAll(".sub-menu-item");
    const mainContent = document.getElementById("main-content");

    subMenuItems.forEach((subMenuItem) => {
      subMenuItem.addEventListener("click", () => {
        const parserId = subMenuItem.dataset.projectid;
        let urlsContent = "";
        let rulesContent = "";
        let settingsContent = "";
        getUrls(parserId).then((urls) => {
          urlsContent += `<div class="box m-4">`;
          urlsContent += `<div class="columns">
              <div class="column"><h1 class="is-size-3">URL's</h1></div>
              <div class="column is-narrow"><button class="button is-primary">Add URL</button></div>
            </div>`;
          urlsContent += `<div class="table-container">`;
          urlsContent += `<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">`;
          urlsContent += `<tr><th>#</th><th>Title</th></tr>`;

          urls.forEach((url) => {
            urlsContent += `<tr><td>${url.id}</td><td>${url.title}</td></tr>`;
          });
          urlsContent += `</div></div></div>`;
          mainContent.innerHTML = urlsContent;
        });
      });
    });
  }
}

function getUrls(parserId) {
  return window.API.getUrls(parserId);
}

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
