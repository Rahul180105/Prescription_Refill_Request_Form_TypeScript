import { state } from "../app.state";

export function populatePatientData(patient: {
  name: string;
  dateOfBirth: string;
  lastApprovalDate: string;
  medications: { name: string; dosage: string }[];
}): void {
  state.form.patientName = patient.name;
  state.form.dateOfBirth = patient.dateOfBirth;
  state.form.lastApprovalDate = patient.lastApprovalDate;

  state.form.medications = patient.medications.map((m) => ({
    name: m.name,
    dosage: m.dosage,
    quantity: null
  }));
}