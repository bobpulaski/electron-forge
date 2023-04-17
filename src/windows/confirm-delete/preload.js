const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("API", {
  closeConfirmDeleteWindow: () =>
    ipcRenderer.invoke("close-confirm-delete-window"),

  deleteUrl: (entityToDelete, entityId, parserId) => {
    ipcRenderer.invoke("delete-entity", entityToDelete, entityId, parserId);
  },

  onUpdateUrlsTableBeforeDelete: (deleteWindowArgs) =>
    ipcRenderer.on("send-settings-before-delete", deleteWindowArgs),
});
