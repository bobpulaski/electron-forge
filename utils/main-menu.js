function renderMainMenuItems() {
  let list = "";
  let text = window.document.getElementById("main-menu");
  getMainMenuItems().then((mainMenuData) => {
    mainMenuData.forEach((item) => {
      list += `<li>${item.title} ${item.id}`;
    });
    text.innerHTML = list;
  });
}
module.exports = renderMainMenuItems;
