import { PatientSection } from './sections/patient';
import { DeliverySection } from './sections/delivery';
import { ConfirmSection } from './sections/confirm';
import { ReasonSection } from './sections/reason';
import { MedicationSection } from './sections/medication';

export function Form(): HTMLFormElement {
  const form: HTMLFormElement = document.createElement('form');
  form.id = 'refill-form';

  /* TITLE */
  const title = document.createElement('h2');
  title.textContent = 'REFILL FORM';
  form.appendChild(title);
  form.append(PatientSection(),MedicationSection(),ReasonSection(),DeliverySection(),ConfirmSection());
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  form.appendChild(submitButton);

  return form;
}



