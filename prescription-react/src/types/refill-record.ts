import type { FormMedication } from "./form-mediction";

export interface RefillRecord{
  patientId:string;
  patientName:string;
  dateOfBirth:string;
  lastApprovalDate:string;
  phone:string;
  email:string;
  medications:FormMedication[];
  reason:string;
  otherReason?:string;
  deliveryAddress:string;
  preferredDeliveryDate?:string;
  deliveryMethod:string;
  specialInstrucions?: string;
  hasInsurance:boolean;
  needsConsulatation:boolean;
  insuranceNumber?:string;
}