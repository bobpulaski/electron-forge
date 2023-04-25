export function headerTemplate(parserWindowArgs) {
  let template = "";
  if (parserWindowArgs.windowMode === "add") {
    template = `<h1 class="is-size-3">Add a new <span class="has-text-grey">Parser</span></h1>`;
  }
  if (parserWindowArgs.windowMode === "edit") {
    template = `<h1 class="is-size-3">Edit parser</h1>`;
  }
  return template;
}

export function inputTemplate(parserWindowArgs) {
  let template = "";
  if (parserWindowArgs.windowMode === "add") {
    template = `<input class="input" placeholder="e.g. Refrigerators" type="text" id="parser-input"
    name="new-parser-input" minlength="4" size="25">`;
  }
  if (parserWindowArgs.windowMode === "edit") {
    template = ``;
  }
  return template;
}

export function buttonsTemplate(parserWindowArgs) {
  let template = "";

  if (parserWindowArgs.windowMode === "add") {
    template = `<button id="add-new-parser-btn" data-projectid="${parserWindowArgs.projectId}" class="button is-normal is-primary">Add</button>
                <button id="close-window-btn" class="button is-normal is-light">Cancel</button>`;
  }

  // windowMode === "add"
  //   ? (template = `<button id="add-new-url-btn" class="button is-normal is-primary">Add</button>
  //                  <button id="close-window-btn" class="button is-normal is-light">Cancel</button>`)
  //   : (template = `<button id="edit-url-btn" class="button is-normal is-primary">Update</button>
  //                  <button id="close-window-btn" class="button is-normal is-light">Cancel</button>`);
  return template;
}
