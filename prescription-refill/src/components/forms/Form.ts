import  {createInput,createTextarea,createRadioGroup,createCheckbox,createMedicationRow} from './form-elements'
export function Form(): HTMLFormElement {
  const form: HTMLFormElement = document.createElement('form');
  form.id = 'refill-form';

  /* TITLE */
  const title = document.createElement('h2');
  title.textContent = 'REFILL FORM';
  form.appendChild(title);

  /* PATIENT CONTACT SECTION */
  const patientSection = document.createElement('div');
  patientSection.className = 'section patient-contact';

  patientSection.appendChild(createInput('Patient ID', 'text'));
  patientSection.appendChild(createInput('Patient Name', 'text'));
  patientSection.appendChild(createInput('Date of Birth', 'date'));
  patientSection.appendChild(createInput('Phone', 'tel'));
  patientSection.appendChild(createInput('Email', 'email'));

  form.appendChild(patientSection);

  /* MEDICATION SECTION */
  const medicationSection = document.createElement('div');
  medicationSection.className = 'section medication-section';
  const medicationList = document.createElement('div');
  medicationList.className='medication-List'
  
  medicationList.appendChild(createMedicationRow());

  medicationSection.appendChild(medicationList);

  form.appendChild(medicationSection);

  /* REASON & APPROVAL SECTION */
  const reasonSection = document.createElement('div');
  reasonSection.className = 'section approval-reason';

  reasonSection.appendChild(createRadioGroup('Reason for Refill', 'reason', [
    'RUNNING_OUT',
    'LOST',
    'TRAVELLING',
    'OTHER'
  ]));

  reasonSection.appendChild(createInput('Other Reason', 'text'));
  reasonSection.appendChild(createInput('Doctor Approval Date', 'date'));

  form.appendChild(reasonSection);

  /* DELIVERY SECTION */
  const deliverySection = document.createElement('div');
  deliverySection.className = 'section delivery-section';

  deliverySection.appendChild(createTextarea('Delivery Address'));
  deliverySection.appendChild(createRadioGroup('Delivery Method', 'delivery', [
    'SAME_DAY',
    'STANDARD'
  ]));
  deliverySection.appendChild(createInput('Preferred Delivery Date', 'date'));
  deliverySection.appendChild(createTextarea('Special Instructions'));

  form.appendChild(deliverySection);

  /* CONFIRMATION SECTION */
  const confirmationSection = document.createElement('div');
  confirmationSection.className = 'section confirmations';

  confirmationSection.appendChild(createCheckbox('Insurance Coverage'));
  confirmationSection.appendChild(createInput('Insurance Number', 'text'));
  confirmationSection.appendChild(createCheckbox('Pharmacist Consultation'));
  confirmationSection.appendChild(createCheckbox('Confirm Identity'));

  form.appendChild(confirmationSection);

  /* SUBMIT BUTTON */
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  form.appendChild(submitButton);

  return form;
}



