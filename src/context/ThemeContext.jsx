import { createContext, useContext, useState, useEffect } from 'react';

// Create the Theme Context
const ThemeContext = createContext();

// ✅ Custom hook for easier access
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ✅ Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Check for saved theme preference or default to light mode
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      // Check system preference if no saved preference
      if (!saved) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return saved === 'dark';
    } catch (error) {
      console.error('Failed to load theme:', error);
      return false;
    }
  });

  // Apply theme to document and save preference
  useEffect(() => {
    try {
      // Save to localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Apply to HTML element for CSS variables
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', isDark ? '#1a1a1a' : '#f0f0f0');
      }
    } catch (error) {
      console.error('Failed to apply theme:', error);
    }
  }, [isDark]);

  // ✅ Toggle between dark and light mode
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // ✅ Set specific theme (useful for future theme options)
  const setTheme = (theme) => {
    setIsDark(theme === 'dark');
  };

  // ✅ Value object - everything we share globally
  const value = {
    isDark,
    toggleTheme,
    setTheme,
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;