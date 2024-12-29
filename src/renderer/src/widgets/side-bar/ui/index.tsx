import React, { useEffect, useState } from "react";
import { Button, Input, Tooltip } from "@renderer/shared/ui";
import { HomeIcon, CameraIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { NavLink, Link } from "react-router";
import { toast } from 'react-toastify';

export function SideBar() {

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [roomName, setRoomName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [rooms, setRooms] = useState<any[]>([]);


  useEffect(() => {
    console.log('rooms', rooms)

  }, [rooms])

  const onChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
    setError(null); // 입력 시 에러 초기화
  }

  const onClickRoomCreate = async () => {
    // 방 이름 유효성 검사
    if (roomName.trim() === '') {
      setError('방 이름을 입력해주세요');
      return;
    }


    try {
      // Electron API를 통해 방 생성 요청
      const result = await window.electronAPI.createRoom(roomName);
      console.log(result)
      toast.success("방 생성에 성공 했습니다.")
      setRooms([...rooms, result.room])
      setIsOpen(false)
    } catch (error) {
      console.error('방 생성 중 오류:', error)
      setError('방 생성 중 문제가 발생했습니다.')
    }
  }


  useEffect(() => {
    const start = async () => {
      try {
        console.log('getRooms')
        const result = await window.electronAPI.getRooms();
        console.log(result)
        setRooms(result.rooms)

      } catch (error) {

      }

    }
    start()

  }, [])

  return (
    <>
      <div className="w-[75px] h-dvh bg-zinc-950 text-white flex flex-col items-center py-4 gap-4 fixed left-0 top-0">
        <Link to="/">
          <Button size="icon" intent="outline">
            <HomeIcon className="size-6" />
          </Button>
        </Link>
        {rooms.map((room) => (
          <Link key={room.id} to={`/room/${room.id}`}>
            <Button size="icon" intent="outline">
              {room.name.slice(0, 1)}
            </Button>

          </Link>

        ))}
        <Tooltip tooltip="새로추가" position="right" additionalClass="w-[60px]">
          <Button size="icon" intent="outline" onClick={() => setIsOpen(true)}>
            <PlusIcon className="size-6" />
          </Button>
        </Tooltip>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-zinc-950 border border-zinc-700 p-8 rounded-md text-neutral-50 w-full">
            <DialogTitle className="font-bold">새로운 방을 만들어 보세요.</DialogTitle>
            <Description>쉽고, 간단하게 파일을 공유 할 수 있습니다</Description>
            <div className="flex items-center justify-center">
              <div className="w-[75px] h-[75px] rounded-full border border-zinc-700 flex items-center justify-center flex-col">
                <CameraIcon className="size-6" />
                <span className="text-xs">UPLOAD</span>
              </div>
            </div>
            <div>
              <Input
                value={roomName}
                onChange={onChangeRoomName}
                placeholder="방 이름을 입력하세요"
              />
              {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <Button onClick={() => setIsOpen(false)}>취소</Button>
              <Button
                intent="primary"
                onClick={onClickRoomCreate}
              >
                만들기
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
