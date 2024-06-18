import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.jsx";
// import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import ReactToastistyContainer from "./components/loaders/ReactToastistyContainer.jsx";
import LoadingBarProvider from "./contexts/LoadingBarContext.jsx";
import CustomHelmet from "./SEO/CustomHelmet.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <UserProvider>
        <LoadingBarProvider>
          <App />
        </LoadingBarProvider>
      </UserProvider>
    </DarkModeProvider>
    <CustomHelmet />
    <ReactToastistyContainer />
  </React.StrictMode>
);
