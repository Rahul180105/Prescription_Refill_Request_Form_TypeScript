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
  medications?:string;
  medicationsRows?:Record<number,string>;
}