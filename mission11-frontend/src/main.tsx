import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Importing Bootstrap styles so everything looks nicer
// Don't forget this or styling won't apply
import 'bootstrap/dist/css/bootstrap.min.css'

// Rendering the main App component into the root div
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)