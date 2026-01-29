import React, { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const body = document.body;

    if (dark) {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="theme-toggle">
      <button onClick={() => setDark(prev => !prev)}>
        {dark ? "🌙 Night" : "☀️ Day"}
      </button>
    </div>
  );
}

export default ThemeToggle;