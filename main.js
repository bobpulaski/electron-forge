const { app, BrowserWindow, ipcMain } = require("electron");
const { Menu } = require("electron");

const path = require("path");
const fs = require("fs");
const { dialog } = require("electron");
const { log } = require("console");
// const remote = require("electron").remote;

//const { globalShortcut } = require("electron");

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("parser.sqlite");

const { getMainMenuItems } = require("./queries.js");
const { getSubMenuItems } = require("./queries.js");
const { postMainMenuData } = require("./queries.js");
const { postUrl } = require("./queries.js");
const { updateUrl } = require("./queries.js");
const { getUrls } = require("./queries.js");
const { getRules } = require("./queries.js");

//Menu.setApplicationMenu(null);

let mainWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    icon: path.join(__dirname, "src/windows/icon.ico"),
    autoHideMenuBar: true,

    // fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "src/windows/main/preload.js"),
    },
  });

  mainWindow.loadFile("./src/windows/main/index.html");
  mainWindow.webContents.openDevTools();
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

app.disableHardwareAcceleration();

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

/* Disabled Refresh App */
/* 

app.on("browser-window-focus", function () {
  globalShortcut.register("CommandOrControl+R", () => {
    console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
    console.log("F5 is pressed: Shortcut Disabled");
  });
});

*/
/* ****************************** */

ipcMain.handle("get-main-menu-items", () => {
  return getMainMenuItems();
});

ipcMain.handle("get-sub-menu-items", () => {
  return getSubMenuItems();
});

ipcMain.handle("delete-main-menu-item", (event, id) => {
  try {
    db.run("DELETE FROM projects WHERE id=?", [id]);
  } catch (error) {
    console.log(error);
  }
});

/***********************New Parser Window START*************************************** */
ipcMain.handle("open-add-new-parser-window", (event) => {
  openAddNewParserWindow();
});

ipcMain.handle("close-add-new-parser-window", async (event) => {
  if (addNewParserWindow) {
    await addNewParserWindow.hide();
    addNewParserWindow.close();
  }
});

let addNewParserWindow = null;
function openAddNewParserWindow() {
  addNewParserWindow = new BrowserWindow({
    show: false,
    width: 600,
    height: 325, //add 29 px to the header
    icon: path.join(__dirname, "src/windows/icon.ico"),
    autoHideMenuBar: true,
    resizable: false,
    parent: mainWindow,
    frame: true,
    modal: true,
    maximizable: false,
    minimizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "src/windows/parser/preload.js"),
    },
  });
  addNewParserWindow.loadFile("./src/windows/parser/index.html");
  addNewParserWindow.once("ready-to-show", () => {
    addNewParserWindow.show();
  });
}
/***********************New Parser Window END*************************************** */

/***********************New Project Window START*************************************** */
ipcMain.handle("open-add-new-project-window", (event) => {
  openAddNewProjectWindow();
});

ipcMain.handle("close-window-btn", async (event) => {
  if (addNewProjectWindow) {
    await addNewProjectWindow.hide();
    addNewProjectWindow.close();
  }
});

let addNewProjectWindow = null;
function openAddNewProjectWindow() {
  addNewProjectWindow = new BrowserWindow({
    show: false,
    width: 600,
    height: 325, //add 29 px to the header
    icon: path.join(__dirname, "src/windows/icon.ico"),
    autoHideMenuBar: true,
    resizable: false,
    parent: mainWindow,
    frame: true,
    modal: true,
    maximizable: false,
    minimizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "src/windows/project/preload.js"),
    },
  });
  addNewProjectWindow.loadFile("./src/windows/project/index.html");
  addNewProjectWindow.once("ready-to-show", () => {
    addNewProjectWindow.show();
  });
  // addNewProjectWindow.webContents.openDevTools();
}
/*****************New Project Window END****************************************** */

/*************** New Url Window START **********************************************/

ipcMain.handle(
  "open-url-window",
  (event, windowMode, parserId, urlId, urlTitle) => {
    openUrlWindow(windowMode, parserId, urlId, urlTitle);
  }
);

ipcMain.handle("close-url-window", async (event) => {
  if (urlWindow) {
    await urlWindow.hide();
    urlWindow.close();
  }
});

let urlWindow = null;
function openUrlWindow(windowMode, parserId, urlId, urlTitle) {
  let title = "";
  windowMode === "add" ? (title = "Add URL") : (title = "Edit URL");
  urlWindow = new BrowserWindow({
    title,
    show: false,
    width: 1200,
    height: 800, //add 29 px to the header = 230
    icon: path.join(__dirname, "src/windows/icon.ico"),
    autoHideMenuBar: true,
    resizable: false,
    parent: mainWindow,
    frame: true,
    modal: true,
    maximizable: false,
    minimizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "src/windows/url/preload.js"),
    },
  });
  urlWindow
    .loadFile("./src/windows/url/index.html")
    .then(function () {
      urlWindow.webContents.send("sendSettings", {
        windowMode,
        parserId,
        urlId,
        urlTitle,
      });
      console.log("windowMode = " + windowMode);
      console.log("parserId = " + parserId);
      console.log("urlId = " + urlId);
      console.log("urlTitle = " + urlTitle);
    })
    .then(function () {
      urlWindow.show();
    })
    .then(function () {
      urlWindow.webContents.openDevTools();
    });
  // urlWindow.once("ready-to-show", () => {
}

/*************** New Url Window END **********************************************/

ipcMain.handle("add-new-project", async (event, newProjectInputValue) => {
  postMainMenuData(newProjectInputValue);

  mainWindow.webContents.send("update-menu");
  if (addNewProjectWindow) {
    addNewProjectWindow.hide();
    await addNewProjectWindow.close();
  }
});

ipcMain.handle("add-new-url", async (event, parserId, urlInputValue) => {
  postUrl(parserId, urlInputValue);

  const mode = "add";
  mainWindow.webContents.send("update-urls-table", parserId, mode);
  if (urlWindow) {
    urlWindow.hide();
    await urlWindow.close();
  }
});

ipcMain.handle("edit-url", async (event, urlInputValue, urlId, parserId) => {
  updateUrl(urlInputValue, urlId);

  const mode = "edit";
  await mainWindow.webContents.send("update-urls-table", parserId, mode);
  if (urlWindow) {
    urlWindow.hide();
    urlWindow.close();
  }
});

ipcMain.handle("get-urls", (event, parserId) => {
  const urls = getUrls(parserId);
  return urls;
});

ipcMain.handle("get-rules", (event, parserId) => {
  const rules = getRules(parserId);
  return rules;
});

// fs.writeFileSync("menu.json", await JSON.stringify(mainMenuData, null, 2));
//let menuData = await JSON.parse(fs.readFileSync("menu.json", "utf8"));
