"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@heroui/react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // prevent hydration issue (VERY important for mobile Safari/Chrome)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="px-4 py-2 rounded-full border bg-gray-100 dark:bg-gray-800 animate-pulse w-32 h-10" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        flex items-center gap-2 
        px-4 py-2 
        rounded-full 
        border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-100
        shadow-sm active:scale-95
        transition-all duration-200
        touch-manipulation
        min-w-[140px]
        justify-center
      "
    >
      <span className="text-lg">{isDark ? "🌞" : "🌙"}</span>

      <span className="text-sm font-medium whitespace-nowrap">
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
