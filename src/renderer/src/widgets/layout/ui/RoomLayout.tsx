import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Button } from '@renderer/shared/ui'

import { Bars3Icon } from '@heroicons/react/24/outline';


interface RoomLayoutProps {
  children: React.ReactNode
}

export function RoomLayout({ children }: RoomLayoutProps) {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <header className='flex justify-between'>
          <div>1</div>
          <Menu>
            <MenuButton>
              <Button size="icon" intent="outline">
                <Bars3Icon className="size-6" />
              </Button>
            </MenuButton>
            <MenuItems anchor="bottom">
              <div className='bg-zinc-950 border border-zinc-700 mt-2 mr-4 p-4 rounded text-white'>
                {/* <MenuItem> */}
                {/*   <a className="block data-[focus]:bg-blue-100" href="/settings"> */}
                {/*     Settings */}
                {/*   </a> */}
                {/* </MenuItem> */}
                <MenuItem>
                  <a className="block" href="/support">
                    Support
                  </a>
                </MenuItem>
                <MenuItem>
                  <a className="block" href="/license">
                    License
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>


        </header>
        {children}
      </div>
    </>
  )
}
