import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Ensure the root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
