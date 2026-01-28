import React, { type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import { findPatientId } from "../../../helpers/patient-service";
import { validatePatientId,validateEmail,validatePhone } from "../../../validations/patients";
import { useState } from "react";

type PatientProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
};

export function Patient({ form, setForm }: PatientProps): ReactElement {
  const [idtouched,idsetTouched]=useState(false);
  const [phonetouched,phonesetTouched]=useState(false);
  const [emailtouched,emailsetTouched]=useState(false);
  return (
    <div className="section patient-contact">
      <div className="input-control">
        <label>Patient ID</label>
        <input
  type="text"
  value={form.patientId}
  onChange={(e) => {
    idsetTouched(true)
    const value = e.target.value;

    setForm(prev => ({
      ...prev,
      patientId: value
    }));

    const result = validatePatientId(value);

    if (!result.valid) {
      setForm(prev => ({
        ...prev,
        patientName: "",
        dateOfBirth: "",
        lastApprovalDate: "",
        medications: []
      }));
    } else {
      
      const patient = findPatientId(value);

      if (patient) {
        setForm(prev => ({
          ...prev,
          patientName: patient.name,
          dateOfBirth: patient.dateOfBirth,
          lastApprovalDate: patient.lastApprovalDate,
          medications: patient.medications.map(m => ({
            name: m.name,
            dosage: m.dosage,
            quantity: 0
          }))
        }));
      }
    }

  }}
  onBlur={()=>{idsetTouched(true);}}
  
/>    {idtouched && !validatePatientId(form.patientId).valid&&(
        <div className="error">{validatePatientId(form.patientId).message}</div>
)}
      </div>


      <div className="input-control">
        <label>Patient Name</label>
        <input type="text" value={form.patientName} readOnly />
        <div className="error"></div>
      </div>

      <div className="input-control">
        <label>Date of Birth</label>
        <input type="date" value={form.dateOfBirth} readOnly />
        <div className="error"></div>
      </div>

      <div className="input-control">
        <label>Phone *</label>
        <input
  type="tel"
  value={form.phone}
  maxLength={10}
  onChange={(e) => {
    phonesetTouched(true);

    const digitsOnly = e.target.value.replace(/\D/g, "");

    setForm(prev => ({
      ...prev,
      phone: digitsOnly
    }));
  }}
  onBlur={() => phonesetTouched(true)}
/>
        {phonetouched && !validatePhone(form.phone).valid &&
        (<div className="error">{validatePhone(form.phone).message}</div>
)}
      </div>




      <div className="input-control">
        <label>Email *</label>
        <input
  type="email"
  value={form.email}
  onChange={(e) => {
    emailsetTouched(true);

    setForm(prev => ({
      ...prev,
      email: e.target.value
    }));
  }}
  onBlur={() => emailsetTouched(true)}
/>
       {emailtouched&&!(validateEmail(form.email).valid)&&(
        <div className="error">{validateEmail(form.email).message}</div>
        )}
      </div>

    </div>
  );
}

export default Patient;