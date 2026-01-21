import type { RefillFormState,RefillRecord,FormErrors} from './types';

export interface AppState{
  form:RefillFormState;
  records:RefillRecord[];
  editId:number|null;
  errors:FormErrors;
  
};
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

export const state:AppState={
  form:initialFormState,
  records:[],
  editId:null,
  errors:{} as FormErrors
};
