const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  closeWindow: () => ipcRenderer.invoke("close-window-btn"),

  addNewProject: (newProjectInputValue) => {
    ipcRenderer.invoke("add-new-project", newProjectInputValue);
  },
});
