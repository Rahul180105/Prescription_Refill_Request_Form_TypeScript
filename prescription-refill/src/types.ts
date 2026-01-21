export interface PatientMedication{
  name:string;
  dosage:string;
}


export interface Patient{
  id:string;
  name:string;
  dateOfBirth:string;
  lastApprovalDate:string;
  medications:PatientMedication[];
}
 
export interface FormMedication{
  name:string;
  dosage:string;
  quantity:number | null;
}


export interface RefillFormState{
  patientId:string;
  patientName:string;
  dateOfBirth:string;
  lastApprovalDate:string;
  phone:string;
  email:string;
  medications:FormMedication[];
  reason:string|null//;
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
export interface FormErrors{
  patientId?:string;
  phone?:string;
  email?:string;
  reason?:string;
  otherReason?:string;
  deliveryaddress?:string;
  deliveryMethod?:string;
  insuranceNumber?:string;
  confirmation?:string;
  medications?:Record<number,string>;
}
export interface RefillRecord{
  patientId:string;
  patientName:string;
  dateOfBirth:string;
  lastApprovalDate:string;
  phone:string;
  email:string;
  medications:FormMedication[];
  reason:string;
  otherReason:string;
  deliveryAddress:string;
  preferredDeliveryDate:string;
  deliveryMethod:string;
  specialInstrucions: string;
  hasInsurance:boolean;
  needsConsulatation:boolean;
  insuranceNumber:string;
}