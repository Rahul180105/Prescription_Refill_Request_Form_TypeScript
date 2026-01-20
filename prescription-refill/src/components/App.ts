import{Form} from './forms/Form'
export function renderApp():void{
  const root = document.getElementById('app');
  if (!root) {
    throw Error('Root element absent')
  }
  root.innerHTML = '';
  const layout : HTMLDivElement = document.createElement('div');
  layout.className = 'app';
  layout.appendChild(Form());
  root.appendChild(layout);
}