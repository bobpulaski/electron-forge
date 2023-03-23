const mainTabs = document.getElementById("main-tabs"); // Get Tabs Elements
window.global = "tab-item-urls";

function renderMainMenuItems() {
  // let jaga = window.global;
  let mainItems = "";
  let mainMenuHtml = document.getElementById("main-menu");
  // list += `<li>${item.title} <button id="${item.id}-del" class="delete-main-menu-item-btn">-</button> <button id="${item.id}-add" class="add-sub-menu-item-btn">+</button>`;
  getMainMenuItems().then((mainMenuItems) => {
    getSubMenuItems().then((subMenuItems) => {
      mainMenuItems.forEach((mainMenuItem) => {
        mainItems += `<span class="headers has-text-light left" 
        data-id="${mainMenuItem.id}" data-title="${mainMenuItem.title}">${mainMenuItem.title}<i class="arrow"></i></span><ul class="headers-ul hide">`;

        subMenuItems.forEach((subMenuItem) => {
          if (mainMenuItem.id === subMenuItem.project_id) {
            mainItems += `<li class="sub-menu-item" 
              data-parserid="${subMenuItem.id}">${subMenuItem.title}</li>`;
          }
        });
        mainItems += `<li class = "add-new-parser-btn"><span class="mr-2">+</span>Add a new parser</li></ul>`;
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
          // h3.classList.remove("active-menu-item");
        });
        // h3.classList.toggle("active-menu-item");
        h3.nextElementSibling.classList.toggle("hide");
      });
    });
  }

  function parserMenuAction() {
    const subMenuItems = document.querySelectorAll(".sub-menu-item");
    const mainContent = document.getElementById("main-content");
    const addSubmenuItemBtns = document.querySelectorAll(".add-new-parser-btn");

    // Обработка нажатия пункта добавления парсера
    addSubmenuItemBtns.forEach((addSubmenuItemBtn) => {
      addSubmenuItemBtn.addEventListener("click", () => {
        let projectId = addSubmenuItemBtn.parentNode.previousSibling.dataset.id;
        openAddNewParserWindow(projectId);
      });
    });

    subMenuItems.forEach((subMenuItem) => {
      subMenuItem.addEventListener("click", () => {
        mainTabs.classList.remove("hide"); //Отображаем табулятор

        subMenuItems.forEach((subMenuItem) => {
          subMenuItem.classList.remove("active-submenu-item");
          subMenuItem.classList.remove("active-menu-item");
        });
        subMenuItem.classList.add("active-submenu-item");
        subMenuItem.classList.add("active-menu-item");

        let urlsContent = "";
        let rulesContent = "";
        let settingsContent = "";

        const parserId = subMenuItem.dataset.parserid; //Get SubMenu Item ID By data-id

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

            renderMainContentAndTabs(global);
            renderBreadCrumbs(subMenuItem, parserId);
            document
              .getElementById("add-url-btn")
              .addEventListener("click", (element) => {
                console.log(element.currentTarget.dataset.parserid);
              });
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

  // Нажатие на TAB
  const tabItems = document.querySelectorAll(".tab-item");
  tabItems.forEach((tabItem) => {
    tabItem.addEventListener("click", () => {
      window.global = tabItem.id; //При нажатии на ТАБ запоминаем глобально ID вкладки
      renderMainContentAndTabs(tabItem.id);
    });
  });

  function renderMainContentAndTabs(jaga) {
    switch (jaga) {
      case "tab-item-urls":
        document.getElementById("urls").classList.remove("hide");
        document.getElementById("rules").classList.add("hide");
        // document.getElementById("settings").classList.add("hide");

        document.getElementById("tab-item-urls").classList.add("is-active");
        document.getElementById("tab-item-rules").classList.remove("is-active");
        document
          .getElementById("tab-item-settings")
          .classList.remove("is-active");

        break;
      case "tab-item-rules":
        document.getElementById("rules").classList.remove("hide");
        document.getElementById("urls").classList.add("hide");
        // document.getElementById("settings").classList.add("hide");

        document.getElementById("tab-item-urls").classList.remove("is-active");
        document.getElementById("tab-item-rules").classList.add("is-active");
        document
          .getElementById("tab-item-settings")
          .classList.remove("is-active");

        break;
      case "tab-item-settings":
        document.getElementById("rules").classList.add("hide");
        document.getElementById("urls").classList.add("hide");
        // document.getElementById("settings").classList.remove("hide");

        document.getElementById("tab-item-urls").classList.remove("is-active");
        document.getElementById("tab-item-rules").classList.remove("is-active");
        document.getElementById("tab-item-settings").classList.add("is-active");

        break;

      default:
        break;
    }
  }

  function renderBreadCrumbs(subMenuItem, parserId) {
    document.getElementById("header-title-for-urls").innerHTML =
      '<span class="tag is-light mr-2">' +
      subMenuItem.parentNode.previousSibling.innerText +
      `</span>` +
      '<span class="tag is-light">' +
      subMenuItem.innerHTML +
      `</span>` +
      `<div class="columns">
        <div class="column"><h2 class="is-size-3">URL's</h2></div>
        <div class="column is-narrow"><button id="add-url-btn" class="button is-primary" data-parserid="${parserId}">Add URL</button></div>
       </div>`;

    document.getElementById("header-title-for-rules").innerHTML =
      '<span class="tag is-light mr-2">' +
      subMenuItem.parentNode.previousSibling.innerText +
      "</span>" +
      '<span class="tag is-light">' +
      subMenuItem.innerHTML +
      "</span>";
  }

  function openAddNewParserWindow(projectId) {
    return window.API.openAddNewParserWindow(projectId);
  }

  const deleteMainMenuItemBtn = document.querySelectorAll(
    ".delete-main-menu-item-btn"
  );
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

// TODO Сделать кнопку в меню схлопывания и развертывания проектов
