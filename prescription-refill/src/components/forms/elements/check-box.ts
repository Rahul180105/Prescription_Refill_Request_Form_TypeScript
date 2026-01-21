
export function createCheckbox(labelText: string): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'input-control';
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(labelText));
  const error = document.createElement('div');
  error.className = 'error';
  wrapper.appendChild(label);
  wrapper.appendChild(error);
  return wrapper;
}