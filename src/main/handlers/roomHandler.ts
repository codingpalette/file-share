
import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'

export const handleRoom = async (_event: Electron.IpcMainInvokeEvent, roomName: string) => {
  try {
    const appDataPath = app.getPath('userData')
    const appFolder = path.join(appDataPath, 'FileShareApp')

    if (!fs.existsSync(appFolder)) {
      fs.mkdirSync(appFolder, { recursive: true })
    }

    const roomFolderName = `${Date.now()}`
    const roomFolderPath = path.join(appFolder, roomFolderName)
    fs.mkdirSync(roomFolderPath, { recursive: true })

    const systemFilePath = path.join(appFolder, 'system.json')
    let currentData: any = { rooms: [] }

    if (fs.existsSync(systemFilePath)) {
      const fileContent = fs.readFileSync(systemFilePath, 'utf-8')
      currentData = JSON.parse(fileContent)
    }

    const roomData = {
      id: roomFolderName,
      name: roomName,
      createdAt: new Date().toISOString(),
      files: []
    }

    currentData.rooms.push(roomData)
    fs.writeFileSync(systemFilePath, JSON.stringify(currentData, null, 2), 'utf-8')

    return {
      success: true,
      message: '방이 성공적으로 생성되었습니다.',
      roomData
    }
  } catch (error) {
    console.error('방 생성 중 오류:', error)
    return {
      success: false,
      message: '방 생성에 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }
  }
}

export const getRooms = async () => {
  try {
    const appDataPath = app.getPath('userData')
    const appFolder = path.join(appDataPath, 'FileShareApp')
    const systemFilePath = path.join(appFolder, 'system.json')

    if (!fs.existsSync(systemFilePath)) {
      return {
        success: true,
        rooms: []
      }
    }

    const fileContent = fs.readFileSync(systemFilePath, 'utf-8')
    const data = JSON.parse(fileContent)

    return {
      success: true,
      rooms: data.rooms
    }
  } catch (error) {
    console.error('방 목록 조회 중 오류:', error)
    return {
      success: false,
      message: '방 목록을 가져오는데 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }
  }
}


export const getRoomInfo = async (_event: Electron.IpcMainInvokeEvent, roomId: string) => {
  try {
    const appDataPath = app.getPath('userData')
    const appFolder = path.join(appDataPath, 'FileShareApp')
    const systemFilePath = path.join(appFolder, 'system.json')

    const fileContent = fs.readFileSync(systemFilePath, 'utf-8')
    const data = JSON.parse(fileContent)

    const room = data.rooms.find((r: any) => r.id === roomId)

    if (!room) {
      return {
        success: false,
        message: '방을 찾을 수 없습니다.'
      }
    }

    return {
      success: true,
      room
    }
  } catch (error) {
    console.error('방 정보 조회 중 오류:', error)
    return {
      success: false,
      message: '방 정보를 가져오는데 실패했습니다.',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }
  }
}
