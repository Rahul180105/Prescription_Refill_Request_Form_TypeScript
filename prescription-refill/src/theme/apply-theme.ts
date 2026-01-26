export function applyTheme(theme: string){
  const root = document.documentElement;
  if(theme === 'dark') root.classList.add('dark-mode');
  else root.classList.remove('dark-mode');
}
