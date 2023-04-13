const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  getMainMenuItems: () => ipcRenderer.invoke("get-main-menu-items"),
  getSubMenuItems: () => ipcRenderer.invoke("get-sub-menu-items"),

  getUrls: (parserId) => ipcRenderer.invoke("get-urls", parserId),
  getRules: (parserId) => ipcRenderer.invoke("get-rules", parserId),

  openAddNewProjectWindow: () =>
    ipcRenderer.invoke("open-add-new-project-window"),

  openAddNewParserWindow: (projectId) =>
    ipcRenderer.invoke("open-add-new-parser-window", projectId),

  openUrlWindow: (windowMode, parserId, urlId, urlTitle) =>
    ipcRenderer.invoke(
      "open-url-window",
      windowMode,
      parserId,
      urlId,
      urlTitle
    ),

  postMainMenuData: (mainMenuItem) =>
    ipcRenderer.invoke("post-main-menu-data", mainMenuItem),

  deleteMainMenuItem: (id) => ipcRenderer.invoke("delete-main-menu-item", id),

  addSubMenuItemBtn: (id) => ipcRenderer.invoke("add-sub-menu-item-btn", id),

  onUpdateMenu: (callback) => ipcRenderer.on("update-menu", callback),

  onUpdateUrlsTable: (parserId, mode) =>
    ipcRenderer.on("update-urls-table", parserId, mode),

  confirmDeleteUrlWindow: (deleteWindowArgs) => {
    ipcRenderer.invoke("open-confirm-delete-url-window", deleteWindowArgs);
  },
});
