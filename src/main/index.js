import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function setAppUserModelId() {
  electronApp.setAppUserModelId('com.electron')
}

function watchWindowShortcuts(window) {
  optimizer.watchWindowShortcuts(window)
}

function activateWindow() {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}

function quitApp() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

app.whenReady().then(() => {
  setAppUserModelId()

  app.on('browser-window-created', (_, window) => {
    watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    activateWindow()
  })
})

app.on('window-all-closed', () => {
  quitApp()
})
