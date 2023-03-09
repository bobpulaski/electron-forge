function urlsTableContent() {
  let start = "";
  let end = "";

  start += `<div class="box m-4">`;
  start += `<div class="columns">
              <div class="column"><h1 class="is-size-3">URL's</h1></div>
              <div class="column is-narrow"><button class="button is-primary">Add URL</button></div>
            </div>`;
  start += `<div class="table-container">`;
  start += `<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">`;
  start += `<tr><th>#</th><th>Title</th></tr>`;

  end += `</div></div></div>`;

  return start;
}
