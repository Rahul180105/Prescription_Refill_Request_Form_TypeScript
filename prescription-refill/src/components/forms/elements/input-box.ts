
export function createInput(labelText: string, type: string): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'input-control';
  const label = document.createElement('label');
  label.textContent = labelText;
  const input = document.createElement('input');
  input.type = type;
  const error = document.createElement('div');
  error.className = 'error';

  wrapper.appendChild(label);
  wrapper.appendChild(input);
  wrapper.appendChild(error);

  return wrapper;
}