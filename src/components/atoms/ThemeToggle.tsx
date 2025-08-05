"use client";

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // When component mounts on the client, read the theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = storedTheme === 'dark' || (storedTheme === null && prefersDark);

    setIsDark(initialDark);
    setIsMounted(true); // Signal that the component has mounted

    if (initialDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDark);
  };
  
  // Don't render the button on the server or before hydration is complete
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="ml-2 inline-flex items-center text-sm text-gray-600 dark:text-gray-300"
    >
      {isDark ? 'Light' : 'Dark'} Mode
    </button>
  );
}