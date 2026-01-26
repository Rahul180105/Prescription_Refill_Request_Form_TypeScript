import { findPatientById } from "../../../utils/helpers/find-patientid";
import { state } from "../../../states/app-state";

export function readOnlyIntigrity():boolean{
  const patient=findPatientById(state.form.patientId);
  if(!patient){
    return false;
  }
  if(state.form.patientName!==patient.name){
    return false;
  }
  if(state.form.dateOfBirth!==patient.dateOfBirth){
    return false;
  }
  if(state.form.lastApprovalDate!=patient.lastApprovalDate){
    return false;
  }
  if(state.form.medications.length!==patient.medications.length){
    return false;
  }
  for(let i:number=0;i<patient.medications.length;i++){
    const x=state.form.medications[i];
    const y=patient.medications[i];
    if(x.name !== y.name) return false;
    if(x.dosage !== y.dosage) return false;
  }
  return true;
}