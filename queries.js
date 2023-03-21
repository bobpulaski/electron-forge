const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("parser.sqlite");

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

module.exports = {
  getMainMenuItems,
  getSubMenuItems,
  postMainMenuData,
  getUrls,
  getRules,
};