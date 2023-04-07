export function headerTmplate(windowMode) {
  let template = "";
  windowMode === "add"
    ? (template = `<h1 class="is-size-3">Add URL</h1>`)
    : (template = `<h1 class="is-size-3">Edit URL</h1>`);
  return template;
}

export function inputTemplate(windowMode) {
  let template = "";
  windowMode === "add"
    ? (template = `<input class="input" placeholder="e.g. https://sitename.com/products/bag" type="text" id="new-url-input"
    name="new-url-input" minlength="4" size="25">`)
    : (template = `<input class="input" type="text" id="new-url-input"
    name="new-url-input" minlength="4" size="25">`);
  return template;
}

