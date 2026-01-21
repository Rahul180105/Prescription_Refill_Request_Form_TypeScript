import { state } from "../../../app.state";
import { createRadioGroup } from "../elements/radio-grp";
import { createInput } from "../elements/input-box";
import { wireRadioGroup,wireInput } from "../../../utils/dom";
import { errorRender } from "../../../utils/error-helpers/error-render";


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
  wireRadioGroup(reasonRadios,()=>state.form.reason,(value)=>{
    state.form.reason=value;
    if(value!=="OTHER"){
      state.form.otherReason="";
    }
  });
  reasonSection.appendChild(reasonControl);
  errorRender(reasonControl,state.errors.reason);


  /* wire reason */
  const otherReasonControl = createInput('Other Reason', 'text');
  const otherReasonInput = otherReasonControl.querySelector('input');
  if (otherReasonInput) {
    wireInput(otherReasonInput,() => state.form.otherReason,(value) => {
      state.form.otherReason = value;
  
      });
  }
  reasonSection.append(otherReasonControl)
  errorRender(otherReasonControl,state.errors.otherReason);
  /*used to hide the other reason box */
   if(state.form.reason==='OTHER'){
    otherReasonControl.style.display='block';
  }else{
    otherReasonControl.style.display='none';
  }

  const approvalControl = createInput('Last Approval Date', 'date');
  const approvalInput = approvalControl.querySelector('input');

  if (approvalInput) {
    approvalInput.value = state.form.lastApprovalDate;
    approvalInput.readOnly = true;
  }

  reasonSection.appendChild(approvalControl);
  
  return reasonSection;
}