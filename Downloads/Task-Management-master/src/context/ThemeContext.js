import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
