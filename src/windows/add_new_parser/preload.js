const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  closeAddNewParserWindow: () => ipcRenderer.invoke("close-add-new-parser-window"),
});
