import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./contexts/UserContext.jsx";
// import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import ReactToastistyContainer from "./components/loaders/ReactToastistyContainer.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </UserContextProvider>
    <ReactToastistyContainer />
  </React.StrictMode>
);
