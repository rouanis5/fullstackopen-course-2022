import React from 'react'
import ReactDOM from 'react-dom/client'
import { DiaryContextProvider } from './contexts/DiaryContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DiaryContextProvider>
      <App />
    </DiaryContextProvider>
  </React.StrictMode>
)
