import { useState, useEffect } from "react";

export type ThemeMode = "light";

export function useTheme() {
  const [theme] = useState<ThemeMode>("light");

  useEffect(() => {
    localStorage.removeItem("skeleton_explorer_theme");
    document.documentElement.classList.remove("dark");
  }, []);

  const toggleTheme = () => {};

  return { theme: "light" as ThemeMode, isDark: false, setTheme: () => {}, toggleTheme };
}

