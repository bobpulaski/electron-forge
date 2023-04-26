const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("src/db/parser.sqlite");

function getMainMenuItems() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM projects", (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function getSubMenuItems() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM parsers", (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function postMainMenuData(mainMenuItem) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO projects (title) VALUES (?)", [mainMenuItem]),
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      };
  });
}

function postUrl(parserId, newUrlInputValue) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO urls (parser_id, title) VALUES (?,?)", [
      parserId,
      newUrlInputValue,
    ]),
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      };
  });
}

function updateUrl(urlInputValue, urlId) {
  console.log(urlInputValue);
  return new Promise((resolve, reject) => {
    db.run("UPDATE urls SET title = ? WHERE id = ?", [urlInputValue, urlId]),
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      };
  });
}

function deleteEntity(entityToDelete, entityId) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM urls WHERE id = ?", [entityId]),
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      };
  });
}

function getUrls(parserId) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM urls WHERE parser_id=?", [parserId], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function getRules(parserId) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM rules WHERE parser_id=?", [parserId], (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

function postParser(projectId, parserInputValue) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO parsers (project_id, title) VALUES (?,?)",
      [projectId, parserInputValue],
      function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

module.exports = {
  getMainMenuItems,
  getSubMenuItems,
  postMainMenuData,
  postUrl,
  updateUrl,
  deleteEntity,
  postParser,
  getUrls,
  getRules,
};
