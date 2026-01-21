import { state } from '../../app.state';
import { PatientSection } from './sections/patient';
import { DeliverySection } from './sections/delivery';
import { ConfirmSection } from './sections/confirm';
import { ReasonSection } from './sections/reason';
import { MedicationSection } from './sections/medication';
import { saveRecords } from '../../app.storage';
import type { RefillRecord } from '../../types';
import { renderApp } from '../App';
import { setErrors } from '../../utils/error-helpers/set-error';
import { hasErrors } from '../../utils/error-helpers/has-error';
import { validateForm } from './validations/validate';
import { BuildPayload } from './build-payload';
import { resetFormState } from '../../utils/reset-formstate';
  

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
    renderApp();
  });

  return form;
}