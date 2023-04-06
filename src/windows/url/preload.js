const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  closeUrlWindow: () => ipcRenderer.invoke("close-url-window"),

  addNewUrl: (parserId, newUrlInputValue) => {
    ipcRenderer.invoke("add-new-url", parserId, newUrlInputValue);
  },

  sendSettings: (message) => {
    ipcRenderer.on("sendSettings", message);
  },
});
