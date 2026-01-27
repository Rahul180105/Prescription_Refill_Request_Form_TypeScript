import type { FormMedication } from "./form-mediction";

export interface RefillFormState{
  patientId:string;
  patientName:string;
  dateOfBirth:string;
  lastApprovalDate:string;
  phone:string;
  email:string;
  medications:FormMedication[];
  reason:string|null;
  otherReason:string;
  deliveryAddress:string;
  preferredDeliveryDate:string;
  deliveryMethod:string| null;
  specialInstrucions: string;
  hasInsurance:boolean;
  insuranceNumber:string;
  needsConsulatation:boolean;
  confirmIdentity:boolean;
}