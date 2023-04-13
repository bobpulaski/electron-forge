const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  closeConfirmDeleteWindow: () => ipcRenderer.invoke("close-confirm-delete-window"),
});
