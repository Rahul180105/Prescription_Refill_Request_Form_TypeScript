
import { patientID } from "./id";
import { patientName } from "./name";
import { patientDob } from "./dob";
import { patientPhone } from "./phone";
import { patientEmail } from "./email";


export function PatientSection(): HTMLDivElement {
  const patientSection = document.createElement("div");
  patientSection.className = "section patient-contact";

  patientSection.appendChild(patientID());
  patientSection.appendChild(patientName());
  patientSection.appendChild(patientDob());
  patientSection.appendChild(patientPhone());
  patientSection.appendChild(patientEmail());


  return patientSection;
}



