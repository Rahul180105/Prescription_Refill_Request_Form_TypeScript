import { loadRecords } from './storage/load';
import { renderApp } from "./components/App";
import './style.css';
import { initThemeToggle } from './theme/theme-toggle';

document.addEventListener('DOMContentLoaded', ():void => {
  loadRecords();
  initThemeToggle();
  renderApp();
})



