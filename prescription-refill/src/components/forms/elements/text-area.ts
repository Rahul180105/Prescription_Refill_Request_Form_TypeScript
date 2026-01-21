export function createTextarea(labelText: string): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'input-control';

  const label = document.createElement('label');
  label.textContent = labelText;

  const textarea = document.createElement('textarea');

  const error = document.createElement('div');
  error.className = 'error';

  wrapper.appendChild(label);
  wrapper.appendChild(textarea);
  wrapper.appendChild(error);

  return wrapper;
}