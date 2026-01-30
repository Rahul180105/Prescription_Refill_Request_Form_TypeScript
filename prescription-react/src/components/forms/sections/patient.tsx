import { useState, type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import type { FormErrors } from "../../../types";
import { findPatientId } from "../../../helpers/patient-service";
import {
  validatePatientId,
  validatePhone,
  validateEmail,
} from "../../../validations/patients";

type PatientProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
  errors: Partial<FormErrors>;
};

export function Patient({
  form,
  setForm,
  errors,
}: PatientProps): ReactElement {
  const [idTouched, setIdTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const idValidation = validatePatientId(form.patientId);
  const phoneValidation = validatePhone(form.phone);
  const emailValidation = validateEmail(form.email);

  const showIdError =
    (idTouched || errors.patientId) && !idValidation.valid;

  const showPhoneError =
    (phoneTouched || errors.phone) && !phoneValidation.valid;

  const showEmailError =
    (emailTouched || errors.email) && !emailValidation.valid;

  return (
    <div className="mt-6 space-y-6">

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
          Patient ID *
        </label>

        <input
          type="text"
          value={form.patientId}
          onChange={e => {
            const value = e.target.value;
            setIdTouched(true);

            setForm(prev => ({
              ...prev,
              patientId: value,
            }));

            const result = validatePatientId(value);
            if (!result.valid) {
              setForm(prev => ({
                ...prev,
                patientName: "",
                dateOfBirth: "",
                lastApprovalDate: "",
                medications: [],
              }));
              return;
            }

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
                  quantity: 0,
                })),
              }));
            }
          }}
          onBlur={() => setIdTouched(true)}
          className={`
            w-full rounded-lg px-3 py-2 text-sm
            bg-white text-slate-900
            focus:outline-none
            dark:bg-slate-800 dark:text-slate-100
            ${
              showIdError
                ? "border-red-500 ring-2 ring-red-400/30"
                : "border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
            }
          `}
        />

        {showIdError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.patientId ?? idValidation.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-400">
          Patient Name
        </label>

        <input
          type="text"
          value={form.patientName}
          readOnly
          className="
            w-full rounded-lg px-3 py-2 text-sm
            bg-slate-100 text-slate-600
            border border-slate-300
            dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400
          "
        />
      </div>


      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-400">
          Date of Birth
        </label>

        <input
          type="date"
          value={form.dateOfBirth}
          readOnly
          className="
            w-full rounded-lg px-3 py-2 text-sm
            bg-slate-100 text-slate-600
            border border-slate-300
            dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400
          "
        />
      </div>

  
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
          Phone *
        </label>

        <input
          type="tel"
          maxLength={10}
          value={form.phone}
          onChange={e => {
            setPhoneTouched(true);
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setForm(prev => ({
              ...prev,
              phone: digitsOnly,
            }));
          }}
          onBlur={() => setPhoneTouched(true)}
          className={`
            w-full rounded-lg px-3 py-2 text-sm
            bg-white text-slate-900
            focus:outline-none
            dark:bg-slate-80 dark:text-slate-100
            ${
              showPhoneError
                ? "border-red-500 ring-2 ring-red-400/30"
                : "border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
            }
          `}
        />

        {showPhoneError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.phone ?? phoneValidation.message}
          </p>
        )}
      </div>


      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
          Email *
        </label>

        <input
          type="email"
          value={form.email}
          onChange={e => {
            setEmailTouched(true);
            setForm(prev => ({
              ...prev,
              email: e.target.value,
            }));
          }}
          onBlur={() => setEmailTouched(true)}
          className={`
            w-full rounded-lg px-3 py-2 text-sm
            bg-white text-slate-900
            focus:outline-none
            dark:bg-slate-80 dark:text-slate-100
            ${
              showEmailError
                ? "border-red-500 ring-2 ring-red-400/30"
                : "border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
            }
          `}
        />

        {showEmailError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email ?? emailValidation.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Patient;