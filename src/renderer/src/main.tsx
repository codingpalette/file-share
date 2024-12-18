import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/providers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)