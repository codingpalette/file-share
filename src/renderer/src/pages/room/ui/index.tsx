import { MainLayout } from "@renderer/widgets/layout"
import { useEffect, useState } from "react"
import { useParams } from "react-router"






export function RoomPage() {

  const { id } = useParams()

  const [roomInfo, setRoomInfo] = useState<any>(null)

  useEffect(() => {
    const fetchRoomInfo = async () => {
      if (!id) return

      const response = await window.electron.ipcRenderer.invoke('get-room-info', id)
      console.log(response)

      if (response.success) {
        setRoomInfo(response.room)
      } else {
        console.error(response.message)
      }
    }

    fetchRoomInfo()
  }, [id])

  return (
    <>

      <MainLayout>
        <div>RoomPage</div>
        <div>
          <h1>{roomInfo?.name}</h1>
          <p>Created: {roomInfo?.createdAt}</p>
          {/* Files list can be added here */}
        </div>

      </MainLayout>
    </>
  )
}
