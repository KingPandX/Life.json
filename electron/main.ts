import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { app, BrowserWindow, ipcMain } from 'electron'
import { getLife, createConfig, setLife, life, type } from './modules/life'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let Life: life = getLife()

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
// The built directory structure
//
// ├─┬ dist
// │ ├─┬ electron
// │ │ ├── main.js
// │ │ └── preload.js
// │ ├── index.html
// │ ├── ...other-static-files-from-public
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.FARM_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public')

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.FARM_PUBLIC, 'logo.svg'),
    webPreferences: {
      preload: path.join(__dirname, './preload.mjs'),
    },
  })

  // Create the configuration file if it does not exist
  createConfig()

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (process.env.FARM_DEV_SERVER_URL) {
    win.loadURL(process.env.FARM_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  app.quit()
  win = null
})

app.whenReady().then(createWindow)

// Llamado a guardar life.json
ipcMain.on('fl-save', (event) => {
  setLife(Life)
})

// Agregar un elemento a life.json
ipcMain.on('fl-add', (event, type: type, data) => {
  Life.life[type].push(data)
})

// Eliminar un elemento de life.json
ipcMain.on('fl-delete', (event, type: type, index: number) => {
  Life.life[type].splice(index, 1)
})