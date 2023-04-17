export function headerTemplate(deleteWindowArgs) {
  let template = "";
  deleteWindowArgs.entityToDelete === "url"
    ? (template = `<h1 class="is-size-3">Delete this URL?</h1>
                   <p>${deleteWindowArgs.entityTitle}</p>`)
    : (template = `<h1 class="is-size-3">Unknowntype</h1>`);
  return template;
}

export function buttonsTemplate(deleteWindowArgs) {
  let template = "";
  deleteWindowArgs.entityToDelete === "url"
    ? (template = `<button id="delete-entity-btn" class="button is-normal is-danger"
                      data-parserid=${deleteWindowArgs.parserId} 
                      data-entitytodelete=${deleteWindowArgs.entityToDelete} 
                      data-entityid=${deleteWindowArgs.entityId}>Delete</button>
                   <button id="close-window-btn" class="button is-normal is-light">Cancel</button>`)
    : (template = `<p>unknowntype</p>`);
  return template;
}
