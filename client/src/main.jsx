import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './contexts/UserContext.jsx'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
