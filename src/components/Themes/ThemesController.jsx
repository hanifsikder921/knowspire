import { useEffect, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { IoSunnyOutline } from "react-icons/io5";

const ThemesController = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className=" top-4 right-4 z-50 text-white text-xl p-2 bg-black/30 rounded-full hover:scale-110 duration-300"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <IoSunnyOutline /> : <FaMoon />}
    </button>
  );
};

export default ThemesController;
