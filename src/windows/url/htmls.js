export function headerTmplate(windowMode) {
  let template = "";
  windowMode === "add"
    ? (template = `<h1 class="is-size-3">Add URL</h1>`)
    : (template = `<h1 class="is-size-3">Edit URL</h1>`);
  return template;
}

export function inputTemplate(windowMode, urlTitle) {
  let template = "";
  windowMode === "add"
    ? (template = `<input class="input" placeholder="e.g. https://sitename.com/products/bag" type="text" id="url-input"
    name="new-url-input" minlength="4" size="25">`)
    : (template = `<input class="input" type="text" id="url-input"
    name="new-url-input" minlength="4" size="25" value="${urlTitle}">`);
  return template;
}

export function buttonsTemplate(windowMode) {
  let template = "";
  windowMode === "add"
    ? (template = `<button id="add-new-url-btn" class="button is-normal is-primary">Add</button>
                   <button id="close-window-btn" class="button is-normal is-light">Cancel</button>`)
    : (template = `<button id="edit-url-btn" class="button is-normal is-primary">Update</button>
                   <button id="close-window-btn" class="button is-normal is-light">Cancel</button>`);
  return template;
}
