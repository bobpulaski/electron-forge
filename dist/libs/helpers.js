const mainTabs = document.getElementById("main-tabs"); // Get Tabs Elements
const tabItems = document.querySelectorAll(".tab-item");
// const mainContentBoxIds =

function renderMainMenuItems() {
  let mainItems = "";
  let mainMenuHtml = document.getElementById("main-menu");
  // list += `<li>${item.title} <button id="${item.id}-del" class="delete-main-menu-item-btn">-</button> <button id="${item.id}-add" class="add-sub-menu-item-btn">+</button>`;
  getMainMenuItems().then((mainMenuData) => {
    getSubMenuItems().then((subMenuData) => {
      mainMenuData.forEach((mainItem) => {
        mainItems += `<span class="headers has-text-light p-4 left">${mainItem.title}<i class="arrow"></i></span><ul class="headers-ul hide">`;
        subMenuData.forEach((subItem) => {
          if (mainItem.id == subItem.project_id) {
            mainItems += `<li class="sub-menu-item" data-projectid="${subItem.id}">${subItem.title}</li>`;
          }
        });
        mainItems += `<li class = "add-submenu-item-btn"><span class="mr-3">+</span>Add a new parser</li></ul>`;
      });
      mainMenuHtml.innerHTML = mainItems;
      animateMainMenu();
      parserMenuAction();
    });
  });

  function animateMainMenu() {
    const h3s = document.querySelectorAll(".headers");
    // const arrows = document.querySelectorAll(".arrow");
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

  function parserMenuAction() {
    const subMenuItems = document.querySelectorAll(".sub-menu-item");
    const mainContent = document.getElementById("main-content");
    const addSubmenuItemBtns = document.querySelectorAll(
      ".add-submenu-item-btn"
    );

    addSubmenuItemBtns.forEach((addSubmenuItemBtn) => {
      addSubmenuItemBtn.addEventListener("click", () => {
        console.log("addSubmenuItemBtn");
      });
    });

    subMenuItems.forEach((subMenuItem) => {
      subMenuItem.addEventListener("click", () => {
        mainTabs.classList.remove("hide");
        document.getElementById("tab-item-urls").classList.add("is-active");

        document.getElementById("");
        subMenuItems.forEach((subMenuItem) => {
          subMenuItem.classList.remove("active-submenu-item");
        });
        subMenuItem.classList.add("active-submenu-item");

        let urlsContent = "";
        let rulesContent = "";
        let settingsContent = "";

        const parserId = subMenuItem.dataset.projectid; //Get SubMenu Item ID By data-id

        getUrls(parserId).then((urls) => {
          urlsContent = renderUrlsTableContent(); // Get From Dom.js Part Of Html For Render Table
          urls.forEach((url) => {
            urlsContent += `<tr>
                            <td>${url.id}</td>
                            <td>${url.parser_id}</td>
                            <td>${url.title}</td>
                          </tr>`;
          });
          urlsContent += `</div></div></div>`;

          getRules(parserId).then((rules) => {
            rulesContent = renderRulesTableContent();
            rules.forEach((rule) => {
              let startReplace = rule.start.replaceAll("<", "&lt;");
              let endReplace = rule.end.replaceAll("<", "&lt;");
              rulesContent += `<tr>
                              <td>${rule.id}</td>
                              <td>${rule.parser_id}</td>
                              <td>${rule.header}</td>
                              <td>${startReplace}</td>
                              <td>${endReplace}</td>
                            </tr>`;
            });
            rulesContent += `</div></div></div>`;
            mainContent.innerHTML = urlsContent;
            mainContent.innerHTML += rulesContent;
          });
        });
      });
    });
  }

  function getUrls(parserId) {
    return window.API.getUrls(parserId);
  }

  function getRules(parserId) {
    return window.API.getRules(parserId);
  }

  tabItems.forEach((tabItem) => {
    tabItem.addEventListener("click", () => {
      switch (tabItem.id) {
        case "tab-item-urls":
          document.getElementById("urls").classList.remove("hide");
          document.getElementById("rules").classList.add("hide");
          // document.getElementById("settings").classList.add("hide");
          break;
        case "tab-item-rules":
          document.getElementById("rules").classList.remove("hide");
          document.getElementById("urls").classList.add("hide");
          // document.getElementById("settings").classList.add("hide");
          break;
        case "tab-item-settings":
          document.getElementById("rules").classList.add("hide");
          document.getElementById("urls").classList.add("hide");
          // document.getElementById("settings").classList.remove("hide");
          break;

        default:
          break;
      }

      tabItems.forEach((tabItem) => {
        tabItem.classList.remove("is-active");
      });
      tabItem.classList.add("is-active");
    });
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

  const deleteMainMenuItemBtn = document.querySelectorAll(
    ".delete-main-menu-item-btn"
  );

  const addSubMenuItemBtn = document.querySelectorAll(".add-sub-menu-item-btn");
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
