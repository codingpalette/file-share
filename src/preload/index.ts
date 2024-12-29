import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
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
      getRooms: () => ipcRenderer.invoke('get-rooms'),
      getRoomInfo: (roomId: string) => ipcRenderer.invoke('get-room-info', roomId),
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


