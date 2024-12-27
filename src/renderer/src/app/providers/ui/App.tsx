
import { HomePage } from "@renderer/pages/home";
import { RoomPage } from "@renderer/pages/room";
import { HashRouter, Routes, Route } from "react-router";


export function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')





  return (
    <>
      {/* <div className="" style={{paddingLeft: '100px'}}> */}
      {/*   <a target="_blank" rel="noreferrer" onClick={ipcHandle}> */}
      {/*     Send IPC */}
      {/*   </a> */}
      {/* </div> */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room">
            <Route path=":id" element={<RoomPage />} />
          </Route>
          <Route path="/about" element={<div>About</div>} />
        </Routes>

      </HashRouter>
    </>
  )
}
