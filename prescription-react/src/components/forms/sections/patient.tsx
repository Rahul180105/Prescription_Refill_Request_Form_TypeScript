import React, { type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import { findPatientId } from "../../../helpers/patient-service";

type PatientProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
};

export function Patient({ form, setForm }: PatientProps): ReactElement {
  return (
    <div className="section patient-contact">
      <div className="input-control">
        <label>Patient ID</label>
        <input
          type="text"
          value={form.patientId}
          onChange={(e) =>{
            const id=e.target.value;
            setForm(prev => {
                const patient=findPatientId(id);
                if(!patient){
                  return {...prev,patientId:id,patientName:'',dateOfBirth:'',lastApprovalDate:'',medications:[] };
            }
          return{
            ...prev,
            patientId:id,
            patientName:patient.name,
            dateOfBirth:patient.dateOfBirth,
            lastApprovalDate:patient.lastApprovalDate,
            medications:patient.medications.map(m=>({name:m.name,dosage:m.dosage,quantity:0}))
          }
           });
        }}
        />
        <div className="error"></div>
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
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        <div className="error"></div>
      </div>

      <div className="input-control">
        <label>Email *</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <div className="error"></div>
      </div>

    </div>
  );
}

export default Patient;