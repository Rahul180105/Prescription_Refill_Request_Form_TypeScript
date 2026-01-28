import type { Patient} from "../types/patient";
import { patients } from "../data/patient-list";

export function findPatientId(id:string):Patient|undefined{
  return patients.find(p=>p.id===id.trim());
}