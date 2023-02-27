const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { dialog } = require("electron");
const remote = require("electron").remote;

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/parser.sqlite");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    autoHideMenuBar: true,
    // fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "src/windows/main/preload.js"),
    },
  });

  mainWindow.loadFile("./src/windows/main/index.html");
  // mainWindow.webContents.openDevTools();
}

process.on("uncaughtException", (err) => {
  const messageBoxOptions = {
    type: "error",
    title: "Error in Main process",
    message: err.message,
  };
  dialog.showMessageBoxSync(messageBoxOptions);
  //app.exit(1);
});

app.whenReady().then(() => {
  createWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    db.close();
    app.quit();
  }
});

ipcMain.handle("get-main-menu-data", () => {
  const mainMenuData = getMainMenuData();
  return mainMenuData;
});

function getMainMenuData() {
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

ipcMain.handle("delete-main-menu-item", (event, id) => {
  try {
    db.run("DELETE FROM projects WHERE id=?", [id]);
  } catch (error) {
    console.log(error);
  }
});

ipcMain.handle("add-sub-menu-item-btn", (event, id) => {
  try {
    db.run("INSERT INTO parsers (project_id, title) VALUES (?, ?)", [
      id,
      "suka",
    ]);
  } catch (error) {
    console.log(error);
  }
});

/******************************************************************************* */
ipcMain.handle("open-add-new-project-window", (event) => {
  openAddNewProjectWindow();
});

let addNewProjectWindow = null;
function openAddNewProjectWindow() {
  addNewProjectWindow = new BrowserWindow({
    show: false,
    width: 600,
    height: 325, //add 29 px to the header
    autoHideMenuBar: true,
    resizable: false,
    parent: mainWindow,
    frame: false,
    modal: true,
    maximizable: false,
    minimizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "src/windows/add_new_project/preload.js"),
    },
  });
  addNewProjectWindow.loadFile("./src/windows/add_new_project/index.html");
  addNewProjectWindow.once("ready-to-show", () => {
    addNewProjectWindow.show();
  });
  // addNewProjectWindow.webContents.openDevTools();
}
/******************************************************************************* */

ipcMain.handle("close-window-btn", async (event) => {
  if (addNewProjectWindow) {
    addNewProjectWindow.hide();
    await addNewProjectWindow.close();
  }
});

ipcMain.handle("add-new-project", async (event, newProjectInputValue) => {
  postMainMenuData(newProjectInputValue);
  mainWindow.webContents.send("update-menu");
  if (addNewProjectWindow) {
    addNewProjectWindow.hide();
    await addNewProjectWindow.close();
  }
  // mainWindow.reload();
});

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

// fs.writeFileSync("menu.json", await JSON.stringify(mainMenuData, null, 2));
//let menuData = await JSON.parse(fs.readFileSync("menu.json", "utf8"));
