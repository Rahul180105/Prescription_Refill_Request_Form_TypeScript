
import { approvalDate } from "./approval-date";
import { reasonRadio } from "./reason-radio";

export function ReasonSection(): HTMLDivElement {
  const reasonSection = document.createElement("div");
  reasonSection.className = "section approval-reason";
  
  const [x,y] = reasonRadio();
  reasonSection.appendChild(x);
  reasonSection.appendChild(y);
  reasonSection.appendChild(approvalDate());

  return reasonSection;
}