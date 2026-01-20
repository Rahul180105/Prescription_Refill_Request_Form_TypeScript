import { createInput } from "../form-elements";
import { state } from "../../../app.state";
import { wireInput } from "../../../utils/dom";
import { findPatientById } from "../../../app.logic";

export function PatientSection():HTMLDivElement{
    const patientSection = document.createElement('div');
    patientSection.className = 'section patient-contact';
    /*wire input for id */
    const patientIdControl=createInput('Patient ID', 'text');
    const patientIdInput=patientIdControl.querySelector('input');
    if (patientIdInput) {
    wireInput(
      patientIdInput,
      () => state.form.patientId,
      (value) => {
        state.form.patientId = value;

        const patient = findPatientById(value);

        if (patient) {
          state.form.patientName = patient.name;
          state.form.dateOfBirth = patient.dateOfBirth;
          state.form.lastApprovalDate = patient.lastApprovalDate;

          state.form.medications = patient.medications.map((m) => ({
            name: m.name,
            dosage: m.dosage,
            quantity: null
          }));
        } else {
          state.form.patientName = '';
          state.form.dateOfBirth = '';
          state.form.lastApprovalDate = '';
          state.form.medications = [];
        }
      }
    );
  }

  

    patientSection.appendChild(patientIdControl)
    
  const nameControl = createInput('Patient Name', 'text');
  const nameInput = nameControl.querySelector('input');
    if (nameInput) {
      nameInput.value = state.form.patientName;
      nameInput.readOnly = true;
    }

    patientSection.appendChild(nameControl);
    const dobControl = createInput('Date of Birth', 'date');
    const dobInput = dobControl.querySelector('input');
    if (dobInput) {
      dobInput.value = state.form.dateOfBirth;
      dobInput.readOnly = true;
    }
    patientSection.appendChild(dobControl);
   
    /*wire input for phone */
    const phoneControl=createInput('Phone', 'tel');
    const phoneInput=phoneControl.querySelector('input');
    if(phoneInput){
      wireInput(phoneInput,()=>state.form.phone,(value)=>{state.form.phone=value});
    }
    patientSection.append(phoneControl)
  
    /*wire input for email */
    const emailControl=createInput('Email', 'email');
    const emailInput=emailControl.querySelector('input');
    if(emailInput){
      wireInput(emailInput,()=>state.form.email,(value)=>{state.form.email=value});
    }
    patientSection.append(emailControl)
    return patientSection
}