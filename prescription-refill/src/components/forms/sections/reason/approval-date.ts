import { createInput } from "../../elements/input-box";
import { state } from "../../../../states/app-state";

export function approvalDate():HTMLDivElement{
  const approvalControl = createInput("Last Approval Date", "date");
  const approvalInput = approvalControl.querySelector("input");

  if (approvalInput) {
    approvalInput.value = state.form.lastApprovalDate;
    approvalInput.readOnly = true;
  }
  return approvalControl;
}