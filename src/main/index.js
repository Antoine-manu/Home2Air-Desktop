import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import Store from 'electron-store';

require('dotenv').config({ path: 'config.env' });
const store = new Store();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

function setAppUserModelId() {
  electronApp.setAppUserModelId('com.electron');
}

function watchWindowShortcuts(window) {
  optimizer.watchWindowShortcuts(window);
}

function activateWindow() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}

function quitApp() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

app.whenReady().then(() => {
  setAppUserModelId();

  app.on('browser-window-created', (_, window) => {
    watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    activateWindow();
  });
});

app.on('window-all-closed', () => {
  quitApp();
});

ipcMain.handle('setDatas', function (event, data) {
  console.log(data.uid, data.token);
  // keytar.setPassword('setToken', 'token', data.token);
  // keytar.setPassword('setUid', 'userId', data.userId);
  store.set({ uid: data.uid });
  store.set({ token: data.token });
});

ipcMain.handle('getDatas', async function (event, data) {
  console.log(data);
  const token = store.get('token');
  const uid = store.get('uid');
  return { token, uid };
});
