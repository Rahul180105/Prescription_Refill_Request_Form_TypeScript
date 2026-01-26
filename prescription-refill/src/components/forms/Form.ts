import { state } from '../../states/app-state';
import { PatientSection } from './sections/patient';
import { DeliverySection } from './sections/delivery';
import { ConfirmSection } from './sections/confirm';
import { ReasonSection } from './sections/reason';
import { MedicationSection } from './sections/medications';
import { saveRecords } from '../../storage/save';
import type { RefillRecord } from '../../types/refill-record';
import { renderApp } from '../App';
import { setErrors } from '../../utils/helpers/error-helpers/set-error';
import { hasErrors } from '../../utils/helpers/error-helpers/has-error';
import { validateForm } from './validations/validate';
import { BuildPayload } from '../../utils/helpers/build-payload';
import { resetFormState } from '../../utils/helpers/resetFormState';
import { clearErrors } from '../../utils/helpers/error-helpers/clear-error';

  
export function Form(): HTMLFormElement {
  const form: HTMLFormElement = document.createElement('form');
  form.id = 'refill-form';

  /* TITLE */
  const title = document.createElement('h2');
  title.textContent = 'REFILL FORM';
  form.appendChild(title);

  /* SECTIONS */
  form.append(
    PatientSection(),
    MedicationSection(),
    ReasonSection(),
    DeliverySection(),
    ConfirmSection()
  );

  /* SUBMIT BUTTON */
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.addEventListener("mousedown",(e)=>{ e.preventDefault();});
  form.appendChild(submitButton);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errors=validateForm(state.form);
    setErrors(errors);
    if(hasErrors(errors)){
      renderApp();
      return;
    }

    const payload:RefillRecord=BuildPayload(state.form)
    if(state.editId!=null){
      state.records[state.editId]=payload;
      state.editId=null;
    }else{
    state.records.push(payload);}
    saveRecords();
    
    console.log('SUBMIT PAYLOAD:',state.records);
    resetFormState();
    clearErrors();
    renderApp();
  });

  return form;
  
}