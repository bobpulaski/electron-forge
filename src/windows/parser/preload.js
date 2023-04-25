const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  closeParserWindow: () => ipcRenderer.invoke("close-parser-window"),

  getSettingsToPerserWindow: (message) =>
    ipcRenderer.on("send-settings-to-perser-window", message),

  addNewParser: (projectId, parserInputValue) => {
    ipcRenderer.invoke("add-new-parser", projectId, parserInputValue);
  },
});
