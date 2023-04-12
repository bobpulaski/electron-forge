const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  closeUrlWindow: () => ipcRenderer.invoke("close-url-window"),

  addNewUrl: (parserId, urlInputValue) => {
    ipcRenderer.invoke("add-new-url", parserId, urlInputValue);
  },

  updateUrl: (urlInputValue, urlId, parserId) => {
    ipcRenderer.invoke("edit-url", urlInputValue, urlId, parserId);
  },

  sendSettings: (message) => {
    ipcRenderer.on("sendSettings", message);
  },
});
