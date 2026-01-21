import { renderApp } from "./components/App";
import { loadRecords } from "./app.storage";
import './style.css';

document.addEventListener('DOMContentLoaded', ():void => {
  loadRecords();
  renderApp();
})