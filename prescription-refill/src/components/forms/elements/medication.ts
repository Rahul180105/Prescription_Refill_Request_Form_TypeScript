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
