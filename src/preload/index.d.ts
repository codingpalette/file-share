import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    electronAPI: {
      createRoom: (roomName: string) => Promise<any>
    }
    api: unknown
  }
}
