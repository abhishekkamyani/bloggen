import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

import React from "react";

function DarkModeProvider({ children }) {
  const isDark = localStorage.getItem("isDarkMode") === "true" ? true : false;
  const [isDarkMode, setIsDarkMode] = useState(isDark);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
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
