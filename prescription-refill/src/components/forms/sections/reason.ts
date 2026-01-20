import { state } from "../../../app.state";
import { createRadioGroup,createInput } from "../form-elements";
import { wireRadioGroup,wireInput } from "../../../utils/dom";

export function ReasonSection():HTMLDivElement{
  const reasonSection = document.createElement('div');
  reasonSection.className = 'section approval-reason';

  const reasonControl=createRadioGroup('Reason for Refill', 'reason', [
    'RUNNING OUT',
    'LOST',
    'TRAVELLING',
    'OTHER'
  ]);
  const reasonRadios=reasonControl.querySelectorAll<HTMLInputElement>('input[type="radio"]')
  wireRadioGroup(reasonRadios,()=>state.form.reason,(value)=>{state.form.reason=value});
  reasonSection.appendChild(reasonControl);

  /* wire reason */
  const otherReasonControl = createInput('Other Reason', 'text');
  const otherReasonInput = otherReasonControl.querySelector('input');
  if (otherReasonInput) {
    wireInput(otherReasonInput,() => state.form.otherReason,(value) => {state.form.otherReason = value;});
  }
  reasonSection.append(otherReasonControl)
  const approvalControl = createInput('Last Approval Date', 'date');
  const approvalInput = approvalControl.querySelector('input');

  if (approvalInput) {
    approvalInput.value = state.form.lastApprovalDate;
    approvalInput.readOnly = true;
  }

  reasonSection.appendChild(approvalControl);

  return reasonSection;
}