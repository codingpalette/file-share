import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/providers'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      theme="light"

    />
  </React.StrictMode>
)
