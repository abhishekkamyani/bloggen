import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import ReactToastistyContainer from "./components/loaders/ReactToastistyContainer.jsx";
import LoadingBarProvider from "./contexts/LoadingBarContext.jsx";
import CustomHelmet from "./SEO/CustomHelmet.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <LoadingBarProvider>
            <App />
          </LoadingBarProvider>
        </UserProvider>
      </QueryClientProvider>
    </DarkModeProvider>
    <CustomHelmet />
    <ReactToastistyContainer />
  </React.StrictMode>
);
