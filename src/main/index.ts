import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as fs from 'fs'
import * as path from 'path'


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 860,
    show: false, // 창을 숨긴 상태로 생성. 이후 show()로 표시.
    autoHideMenuBar: true, // 메뉴 바를 숨기고 필요 시 Alt 키로 접근 가능.
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Preload 스크립트를 설정하여 메인-렌더러 간의 안전한 통신 구현.
      sandbox: false, // 렌더러 프로세스를 샌드박스 환경에서 실행하여 보안 강화.
      contextIsolation: true, // 렌더러와 Preload의 JavaScript 실행 컨텍스트를 분리하여 보안 강화.
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('test', () => {
    const appDataPath = app.getPath('userData')
    console.log('test')
    console.log('appDataPath', appDataPath)

  })

  ipcMain.on('file', () => {
    const appDataPath = app.getPath('userData')
    const appFolder = path.join(appDataPath, 'MyElectronApp')
    if (!fs.existsSync(appFolder)) {
      fs.mkdirSync(appFolder, { recursive: true })
      console.log(`앱 데이터 폴더 생성: ${appFolder}`)

    }
    const jsonData = [
      {
        id: '1230593-1029',
        title: '테스트 데이터'
      }
    ];
    const jsonPath = path.join(appFolder, 'data.json')
    try {
      fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8')
      console.log(`파일 생성: ${jsonPath}`)
    } catch (error) {
      console.log('error', error)
    }

  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
