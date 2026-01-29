import React, { useState, type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import type { FormErrors } from "../../../types";
import { findPatientId } from "../../../helpers/patient-service";
import {
  validatePatientId,
  validatePhone,
  validateEmail
} from "../../../validations/patients";

type PatientProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
  errors: Partial<FormErrors>;
};

export function Patient({
  form,
  setForm,
  errors
}: PatientProps): ReactElement {
  const [idTouched, setIdTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const idValidation = validatePatientId(form.patientId);
  const phoneValidation = validatePhone(form.phone);
  const emailValidation = validateEmail(form.email);

  return (
    <div className="section patient-contact">
      {/* ---------------- Patient ID ---------------- */}
      <div className={`input-control ${(idTouched && !idValidation.valid) || errors.patientId?'has-error':''}`}>
        <label>Patient ID</label>
        <input
          type="text"
          value={form.patientId}
          onChange={(e) => {
            const value = e.target.value;
            setIdTouched(true);

            setForm((prev) => ({
              ...prev,
              patientId: value
            }));

            const result = validatePatientId(value);

            if (!result.valid) {
              setForm((prev) => ({
                ...prev,
                patientName: "",
                dateOfBirth: "",
                lastApprovalDate: "",
                medications: []
              }));
              return;
            }

            const patient = findPatientId(value);
            if (patient) {
              setForm((prev) => ({
                ...prev,
                patientName: patient.name,
                dateOfBirth: patient.dateOfBirth,
                lastApprovalDate: patient.lastApprovalDate,
                medications: patient.medications.map((m) => ({
                  name: m.name,
                  dosage: m.dosage,
                  quantity: 0
                }))
              }));
            }
          }}
          onBlur={() => setIdTouched(true)}
        />

        {(idTouched && !idValidation.valid) || errors.patientId ? (
          <div className="error">
            {idTouched ? idValidation.message : errors.patientId}
          </div>
        ) : null}
      </div>

      {/* ---------------- Patient Name ---------------- */}
      <div className="input-control">
        <label>Patient Name</label>
        <input type="text" value={form.patientName} readOnly />
      </div>

      {/* ---------------- DOB ---------------- */}
      <div className="input-control">
        <label>Date of Birth</label>
        <input type="date" value={form.dateOfBirth} readOnly />
      </div>

      {/* ---------------- Phone ---------------- */}
      <div className={`input-control ${(phoneTouched && !phoneValidation.valid) || errors.phone?'has-error':''}`}>
        <label>Phone *</label>
        <input
          type="tel"
          maxLength={10}
          value={form.phone}
          onChange={(e) => {
            setPhoneTouched(true);
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setForm((prev) => ({
              ...prev,
              phone: digitsOnly
            }));
          }}
          onBlur={() => setPhoneTouched(true)}
        />

        {(phoneTouched && !phoneValidation.valid) || errors.phone ? (
          <div className="error">
            {phoneTouched ? phoneValidation.message : errors.phone}
          </div>
        ) : null}
      </div>

      {/* ---------------- Email ---------------- */}
      <div className={`input-control ${(emailTouched && !emailValidation.valid) || errors.email?'has-error':''}`}>
        <label>Email *</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => {
            setEmailTouched(true);
            setForm((prev) => ({
              ...prev,
              email: e.target.value
            }));
          }}
          onBlur={() => setEmailTouched(true)}
        />

        {(emailTouched && !emailValidation.valid) || errors.email ? (
          <div className="error">
            {emailTouched ? emailValidation.message : errors.email}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Patient;