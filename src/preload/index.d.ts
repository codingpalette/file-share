import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    electronAPI: {
      createRoom: (roomName: string) => Promise<any>
      getRooms: () => Promise<any>
      getRoomInfo: (roomId: string) => Promise<any>
    }
    api: unknown
  }
}
