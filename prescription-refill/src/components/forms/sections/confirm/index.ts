import { insuranceHandle } from "./insurance";
import { consultation } from "./consult";
import { confirmCond } from "./terms-cond";

export function ConfirmSection(): HTMLDivElement {
  const confirmationSection = document.createElement("div");
  confirmationSection.className = "section confirmations";
  const [x,y]= insuranceHandle();

  confirmationSection.appendChild(x);
  confirmationSection.appendChild(y);
  confirmationSection.appendChild(consultation());
  confirmationSection.appendChild(confirmCond());
 
  return confirmationSection;
}