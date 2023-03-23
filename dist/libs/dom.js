function renderUrlsTableContent() {
  let urlsHtml = "";

  urlsHtml += `<div id="urls" class="box m-4">`;
  urlsHtml += `<h1 id="header-title-for-urls">Header</h1>`;
  urlsHtml += ``;
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

  rulesHtml += `<div id="rules" class="box m-4 hide">`;
  rulesHtml += `<h1 id="header-title-for-rules">Header</h1>`;
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
