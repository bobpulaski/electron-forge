import { headerTemplate, buttonsTemplate } from "./htmls.js";

// Закрытие по ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    return window.API.closeConfirmDeleteWindow();
  }
});

window.API.onUpdateUrlsTableBeforeDelete((event, settings) => {
  console.log(settings.deleteWindowArgs);
  document.getElementById("place-header").innerHTML = headerTemplate(
    settings.deleteWindowArgs
  );
  document.getElementById("place-buttons").innerHTML = buttonsTemplate(
    settings.deleteWindowArgs
  );

  const deleteEntityBtn = document.getElementById("delete-entity-btn");
  const entityToDelete = deleteEntityBtn.dataset.entitytodelete;
  const entityId = deleteEntityBtn.dataset.entityid;
  const parserId = deleteEntityBtn.dataset.parserid;

  deleteEntityBtn.addEventListener("click", () => {
    return window.API.deleteUrl(entityToDelete, entityId, parserId);
  });

  // Закрытие окна по кнопке
  document.getElementById("close-window-btn").addEventListener("click", () => {
    return window.API.closeConfirmDeleteWindow();
    console.log("close click");
  });
});
