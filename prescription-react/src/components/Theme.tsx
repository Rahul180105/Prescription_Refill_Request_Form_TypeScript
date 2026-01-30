import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="
          rounded-xl px-3 py-2 font-semibold
          bg-blsck text-slate-800 border
          dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
          shadow
        "
      >
        {dark ? "🌙" : "☀️"}
      </button>
    </div>
  );
}