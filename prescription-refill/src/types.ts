export interface Medication{
    name:string;
    dosage:string;
    orderQty:string;
}

export interface RefillFormState{
    patientID:string;
    name:string;
    medications:Medication[];
    email:string;
    phone:string;
    reason:string;
    preferredDate:string;
    address:string;
    hasInsurance:boolean;
    insuranceNumber:string;
    confirmed:boolean;
    
}