import { applyTheme } from "./apply-theme";

export function initThemeToggle(){
  const stored = localStorage.getItem('STORAGE_KEY');
  const defaultTheme = stored || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'bright');
  applyTheme(defaultTheme);

  const container = document.createElement('div');
  container.className = 'theme-toggle';
  const btn = document.createElement('button');
  btn.type = 'button';
  const updateLabel = () => { btn.textContent = document.documentElement.classList.contains('dark-mode') ? 'Bright' : 'Night'; };
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    const theme = isDark ? 'dark' : 'bright';
    localStorage.setItem('theme', theme);
    updateLabel();
  });
  updateLabel();
  container.appendChild(btn);
  document.body.appendChild(container);
}