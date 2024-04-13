import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

import React from 'react'

function DarkModeProvider({children}){
    const [isDarkMode, setIsDarkMode] = useState(false);

    return(
        <DarkModeContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    );
}

const useDarkMode = () =>{
    const {isDarkMode, setIsDarkMode} = useContext(DarkModeContext);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    }
    return {isDarkMode, toggleDarkMode};
}

export {useDarkMode, DarkModeProvider};