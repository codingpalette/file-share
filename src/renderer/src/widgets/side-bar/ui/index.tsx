import { Button, Input, Tooltip } from "@renderer/shared/ui";
import { HomeIcon, CameraIcon} from '@heroicons/react/24/solid';
import { PlusIcon} from '@heroicons/react/24/outline';
import { useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";


export function SideBar() {

  const [isOpen, setIsOpen] = useState(false)

  const [roomName, setRoomName] = useState('');
  const onChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  }


  const onClickRoomCreate = async () => {
    console.log('11111')
    if (roomName === '') {
      alert('방 이름을 입력해주세요')
      return;
    }

  }

  return (
    <>
      <div className="w-[75px] h-dvh bg-zinc-950 text-white flex flex-col items-center py-4 gap-4 fixed left-0 top-0">
        <Button size="icon" intent="outline">
          <HomeIcon className="size-6" />
        </Button>
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
              />
            </div>
            <div className="mt-4 flex justify-between">
              <Button>취소</Button>
              <Button intent="primary" onClick={onClickRoomCreate}>만들기</Button>
            </div>

            {/* <div className="flex gap-4"> */}
            {/*   <button onClick={() => setIsOpen(false)}>Cancel</button> */}
            {/*   <button onClick={() => setIsOpen(false)}>Deactivate</button> */}
            {/* </div> */}
          </DialogPanel>
        </div>
      </Dialog>

    </>
  )
}
