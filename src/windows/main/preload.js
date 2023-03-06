const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  getMainMenuData: () => ipcRenderer.invoke("get-main-menu-data"),
  getSubMenuData: () => ipcRenderer.invoke("get-sub-menu-data"),
  getUrls: (parserId) => ipcRenderer.invoke("get-urls", parserId),

  openAddNewProjectWindow: () =>
    ipcRenderer.invoke("open-add-new-project-window"),

  postMainMenuData: (mainMenuItem) =>
    ipcRenderer.invoke("post-main-menu-data", mainMenuItem),

  deleteMainMenuItem: (id) => ipcRenderer.invoke("delete-main-menu-item", id),

  addSubMenuItemBtn: (id) => ipcRenderer.invoke("add-sub-menu-item-btn", id),

  onUpdateMenu: (callback) => ipcRenderer.on("update-menu", callback),
});
