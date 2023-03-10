function renderUrlsTableContent() {
  let urlsHtml = "";

  urlsHtml += `<div class="box m-4">`;
  urlsHtml += `<div class="columns">
              <div class="column"><h2 class="is-size-3">URL's</h2></div>
              <div class="column is-narrow"><button class="button is-primary">Add URL</button></div>
            </div>`;
  urlsHtml += `<div class="table-container">`;
  urlsHtml += `<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">`;
  urlsHtml += `<tr>
                <th>ID</th>
                <th>PARSER_ID</th>
                <th>TITLE</th>
              </tr>`;

  return urlsHtml;
}

function renderRulesTableContent() {
  let rulesHtml = "";

  rulesHtml += `<div class="box m-4">`;
  rulesHtml += `<div class="columns">
              <div class="column"><h2 class="is-size-3">Rules</h2></div>
              <div class="column is-narrow"><button class="button is-primary">Add rule</button></div>
            </div>`;
  rulesHtml += `<div class="table-container">`;
  rulesHtml += `<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">`;
  rulesHtml += `<tr>
                  <th>id</th>
                  <th>parser_id</th>
                  <th>header</th>
                  <th>start</th>
                  <th>end</th>
                </tr>`;

  return rulesHtml;
}
