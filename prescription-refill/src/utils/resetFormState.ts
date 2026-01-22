import { state } from "../app.state";

export function resetFormState():void{
  state.form={
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
  state.editId=null;
  state.errors={}
}