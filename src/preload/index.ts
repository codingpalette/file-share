import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  aa() {
    console.log('aa')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)


    contextBridge.exposeInMainWorld('electronAPI', {
      // 타입이 지정된 createRoom 메서드
      createRoom: (roomName: string) => ipcRenderer.invoke('room', roomName),
    })





  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}


// 윈도우 객체에 타입 선언을 추가하여 타입 안전성 확보
// declare global {
//   interface Window {
//     electronAPI: {
//       createRoom: (roomName: string) => Promise<CreateRoomResult>
//     }
//   }
// }

