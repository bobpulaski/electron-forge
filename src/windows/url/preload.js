const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  closeUrlWindow: () => ipcRenderer.invoke("close-url-window"),

  sendSettings: (message) => {
    ipcRenderer.on("sendSettings", message);
  },
});
