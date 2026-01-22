import { state } from "../app.state";

export function clearPatientData(): void {
  state.form.patientName = "";
  state.form.dateOfBirth = "";
  state.form.lastApprovalDate = "";
  state.form.medications = [];
}