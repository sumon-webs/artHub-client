"use client";

import { useTheme } from "@heroui/react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 px-4 py-2 rounded-full border 
                 border-gray-300 dark:border-gray-700 
                 bg-white dark:bg-gray-900 
                 text-gray-800 dark:text-gray-100 
                 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <span className="text-lg">{isDark ? "🌞" : "🌙"}</span>

      <span className="font-medium">{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
