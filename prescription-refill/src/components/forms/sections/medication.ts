import { state } from '../../../app.state';
import { wireInput } from '../../../utils/dom';

export function MedicationSection(): HTMLDivElement {
  const section = document.createElement('div');
  section.className = 'section medication-section';

  const table = document.createElement('table');
  table.className = 'medication-table';

  /* ---------- Header (ALWAYS RENDERED) ---------- */
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['Medication', 'Dosage', 'Quantity'].forEach((text) => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  /* ---------- Body (ONLY IF DATA EXISTS) ---------- */
  const tbody = document.createElement('tbody');

  state.form.medications.forEach((medication) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = medication.name;

    const dosageCell = document.createElement('td');
    dosageCell.textContent = medication.dosage;

    const quantityCell = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';

    wireInput(
      quantityInput,
      () =>
        medication.quantity !== null
          ? String(medication.quantity)
          : '',
      (value) => {
        medication.quantity = value === '' ? null : Number(value);
      }
    );

    quantityCell.appendChild(quantityInput);

    row.append(nameCell, dosageCell, quantityCell);
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  section.appendChild(table);

  return section;
}