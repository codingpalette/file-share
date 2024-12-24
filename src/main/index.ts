import { app, shell, BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron'
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

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // 앱 초기화시 폴더 생성 이벤트
  checkAndCreateAppDirectory()
}

function checkAndCreateAppDirectory() {
  const appDataPath = app.getPath('userData')
  const appFolder = path.join(appDataPath, 'FileShareApp')
  if (!fs.existsSync(appFolder)) {
    fs.mkdirSync(appFolder, { recursive: true })
    console.log(`앱 데이터 폴더 생성: ${appFolder}`)
    // 앱 폴더 생성 후 system.json 파일 생성
    const systemFilePath = path.join(appFolder, 'system.json')
    fs.writeFileSync(systemFilePath, JSON.stringify({ rooms: [] }, null, 2), 'utf-8')

  }
}





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

  ipcMain.handle('room', (_event, roomName: string) => {
    try {
      // 앱데이터 경로 가저오기
      const appDataPath = app.getPath('userData')
      const appFolder = path.join(appDataPath, 'FileShareApp')

      // 폴더가 없다면 생성
      if (!fs.existsSync(appFolder)) {
        fs.mkdirSync(appFolder, { recursive: true })
      }

      // 방 이름으로 고유한 폴더 생성
      const roomFolderName = `${roomName}_${Date.now()}`
      const roomFolderPath = path.join(appFolder, roomFolderName)
      fs.mkdirSync(roomFolderPath, { recursive: true })

      // system.json 파일 경로
      const systemFilePath = path.join(appFolder, 'system.json');
      let currentData: any = { rooms: [] };

      // 기존 system.json 파일 읽기
      if (fs.existsSync(systemFilePath)) {
        const fileContent = fs.readFileSync(systemFilePath, 'utf-8');
        currentData = JSON.parse(fileContent);
      }

      // 새로운 방 데이터 생성
      const roomData = {
        id: roomFolderName,
        name: roomName,
        createdAt: new Date().toISOString(),
        files: []
      };

      // 기존 데이터에 새로운 방 데이터 추가
      currentData.rooms.push(roomData);

      // 업데이트된 데이터를 system.json에 저장
      fs.writeFileSync(systemFilePath, JSON.stringify(currentData, null, 2), 'utf-8');

      return {
        success: true,
        message: '방이 성공적으로 생성되었습니다.',
        roomData
      };



    } catch (error) {
      console.error('방 생성 중 오류:', error)
      return {
        success: false,
        message: '방 생성에 실패했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      }
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
