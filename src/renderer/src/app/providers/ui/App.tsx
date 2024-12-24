
import { HomePage } from "@renderer/pages/home/ui";
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
          <Route path="/about" element={<div>About</div>} />
        </Routes>

      </HashRouter>
    </>
  )
}
