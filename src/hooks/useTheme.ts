import { useState, useEffect } from "react";

export type ThemeMode = "dark" | "light";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("skeleton_explorer_theme");
    return (saved as ThemeMode) || "dark"; // Default: dark laboratory theme
  });

  useEffect(() => {
    localStorage.setItem("skeleton_explorer_theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, isDark: theme === "dark", setTheme, toggleTheme };
}
