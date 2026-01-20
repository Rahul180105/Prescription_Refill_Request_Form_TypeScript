import type { Patient } from "./types";
import { patients } from "./data/patients"; 

export function findPatientById(id:string):Patient|null{
    return patients.find(p=>p.id===id)??null;
}
