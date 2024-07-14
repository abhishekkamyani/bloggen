import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const isDark = localStorage.getItem("isDarkMode") === "true" ? true : false;
  const [isDarkMode, setIsDarkMode] = useState(isDark);

  useEffect(() => {
    if (isDarkMode) {
      // documentElement == the 'html' tag
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

const useDarkMode = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", !isDarkMode);
  };
  return { isDarkMode, toggleDarkMode };
};

export { useDarkMode, DarkModeProvider };
