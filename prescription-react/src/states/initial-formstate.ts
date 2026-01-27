import type { RefillFormState } from "../types/refill-formstate";

export const initialFormState:RefillFormState={
  patientId:'',
  patientName:'',
  dateOfBirth:'',
  lastApprovalDate:'',
  phone:'',
  email:'',
  medications:[],
  reason:null,
  otherReason:'',
  deliveryAddress:'',
  preferredDeliveryDate:'',
  deliveryMethod:null,
  specialInstrucions: '',
  hasInsurance:false,
  insuranceNumber:'',
  needsConsulatation:false,
  confirmIdentity:false,
};