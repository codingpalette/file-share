import { Button, Tooltip } from "@renderer/shared/ui";
import { MainLayout } from "@renderer/widgets/layout";
import { Link } from "react-router";

import { app } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { useState } from "react";



export function HomePage() {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [count, setCount] = useState(0)

  const onClickTest = () => {

    console.log('test')
    window.electron.ipcRenderer.send('file')
    // const appDataPath = app.getPath('userData')
    // console.log('appDataPath', appDataPath)
  }

  return (
    <>
      <MainLayout>
        <div>
          <h1>Home</h1>
        </div>
        <div>
          <Button onClick={onClickTest}>추가 테스트</Button>
        </div>
        {/* <div> */}
        {/*   <Button onClick={ipcHandle}>추가 테스트2</Button> */}
        {/* </div> */}
        {/* <div> */}
        {/*   <a target="_blank" rel="noreferrer" onClick={ipcHandle}> */}
        {/*     Send IPC */}
        {/*   </a> */}
        {/* </div> */}
      </MainLayout>
    </>
  )
}
