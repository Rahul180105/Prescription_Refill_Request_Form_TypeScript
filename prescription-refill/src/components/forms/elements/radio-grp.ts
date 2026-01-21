export function createRadioGroup(
  labelText: string,
  name: string,
  options: string[]
): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'input-control';

  const label = document.createElement('label');
  label.textContent = labelText;

  wrapper.appendChild(label);
  options.forEach((opt) => {
    const optionLabel = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = name;
    radio.value = opt;
    optionLabel.appendChild(radio);
    optionLabel.appendChild(document.createTextNode(opt));
    wrapper.appendChild(optionLabel);
  });
  const error = document.createElement('div');
  error.className = 'error';
  wrapper.appendChild(error);
  return wrapper;
}