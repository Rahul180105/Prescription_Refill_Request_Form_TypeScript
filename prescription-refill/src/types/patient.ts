import type { PatientMedication } from "./patient-medication";

export interface Patient{
  id:string;
  name:string;
  dateOfBirth:string;
  lastApprovalDate:string;
  medications:PatientMedication[];
}
 