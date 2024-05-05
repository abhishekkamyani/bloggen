import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./contexts/UserContext.jsx";
// import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <DarkModeProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
          transition:Bounce
        />
      </DarkModeProvider>
    </UserContextProvider>
  </React.StrictMode>
);
