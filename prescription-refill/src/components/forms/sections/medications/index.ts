import { state } from "../../../../states/app-state";
import { wireInput } from "../../../../utils/wire-fns/wire-input";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";

export function MedicationSection(): HTMLDivElement {
  const section = document.createElement('div');
  section.className = 'section medication-section';

  const control = document.createElement('div');
  control.className = 'input-control';

  const table = document.createElement('table');
  table.className = 'medication-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['Medication ', ' Dosage ', 'Quantity'].forEach((text) => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);
 
  const tbody = document.createElement('tbody');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'error';

  function validateMedicationsLive() {
    const hasAtLeastOne = state.form.medications.some(
      (m) => m.quantity !== null
    );

    if (!hasAtLeastOne) {
      errorRender(control,'Enter quantity for at least one medication');
    } else {
      errorRender(control, '');
    }
  }

  state.form.medications.forEach((medication) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = medication.name;

    const dosageCell = document.createElement('td');
    dosageCell.textContent = medication.dosage;

    const quantityCell = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.placeholder = '0';
    quantityInput.min = '1';
    quantityInput.max = '12';
    quantityInput.className = 'med-qty';

    quantityInput.value =
      medication.quantity !== null
        ? String(medication.quantity)
        : '';

  wireInput(
  quantityInput,
  () => String(medication.quantity), 
  (value) => {
    const num = Number(value);
    medication.quantity = isNaN(num) ? 0 : num;
    const rowInvalid =
      medication.quantity === null &&
      (medication.quantity < 1 || medication.quantity > 12);

    quantityInput.classList.toggle('qty-error', rowInvalid);
    validateMedicationsLive();
  }
);

quantityInput.addEventListener('blur', () => {
  validateMedicationsLive();
});
    quantityCell.appendChild(quantityInput);
    row.append(nameCell, dosageCell, quantityCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  control.appendChild(table);
  control.appendChild(errorDiv);
  section.appendChild(control);

  /* initial validation */
  // validateMedicationsLive();

  return section;
}