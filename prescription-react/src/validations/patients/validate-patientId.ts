import { findPatientId } from "../../helpers/patient-service";

export function validatePatientId(id:string){
    if(!id.trim()){
        return {valid:false,message:'patient id is reqd'};
    }
    const patient=findPatientId(id.trim());
    if(!patient){
        return {valid:false,message:'enter valid patientId'};
    }
    else{
        return {valid:true};
    }
}