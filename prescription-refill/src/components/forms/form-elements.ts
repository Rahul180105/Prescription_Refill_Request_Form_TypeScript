
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
export function createMedicationRow():HTMLDivElement{
  const row = document.createElement('div');
  row.className = 'medication-row';

  const medicationName = document.createElement('input');
  medicationName.type = 'text';
  medicationName.placeholder = 'Medication Name';

  const dosage = document.createElement('input');
  dosage.type = 'text';
  dosage.placeholder = 'Prescribed Dosage';

  const quantity = document.createElement('input');
  quantity.type = 'number';
  quantity.placeholder = 'Quantity';

  const error = document.createElement('div');
  error.className = 'error';

  row.append(medicationName, dosage, quantity, error);
  return row;
}
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