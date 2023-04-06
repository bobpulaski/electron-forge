export function headerTmplate(windowMode) {
  let template = "";
  windowMode === "add"
    ? (template = `<h1 class="is-size-3">Add URL</h1>`)
    : (template = `<h1 class="is-size-3">Edit URL</h1>`);
  return template;
}
