import { createContext, useContext, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { useDarkMode } from "./DarkModeContext";

const LoadingBarContext = createContext(null);

export default function LoadingBarProvider({ children }) {
  const [progress, setProgress] = useState(0);
  const {isDarkMode} = useDarkMode();
  return (
    <LoadingBarContext.Provider
      value={{ progress, setProgress }}
    >
      {children}
      <LoadingBar
        color={isDarkMode ? "#b3622c" : "white" }
        height={isDarkMode ? 2 : 2}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </LoadingBarContext.Provider>
  );
}

export const useLoadingBarProgress = () => {
  const loadingBar = useContext(LoadingBarContext);
  if (!loadingBar) {
    throw new Error(
      "useLoadingBarProgress must be used within a LoadingBarProvider"
    );
  }
  return loadingBar;
};
