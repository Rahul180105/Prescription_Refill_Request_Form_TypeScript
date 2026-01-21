import { state } from "../../../app.state";
import { createCheckbox } from "../elements/check-box";
import { createInput } from "../elements/input-box";
import { wireCheckbox,wireInput } from "../../../utils/dom";
import { errorRender } from "../../../utils/error-helpers/error-render";

export function ConfirmSection():HTMLDivElement{
  const confirmationSection = document.createElement('div');
  confirmationSection.className = 'section confirmations';
  /*insurance checkbox*/
  const insuranceControl = createCheckbox('Insurance Coverage');
  const insuranceCheckbox = insuranceControl.querySelector<HTMLInputElement>('input[type="checkbox"]');

  if (insuranceCheckbox) {
    wireCheckbox(insuranceCheckbox,() => state.form.hasInsurance,(value) => {state.form.hasInsurance = value;});
 }
  /*insuranceNumber control */
  const insuranceNumberControl = createInput('Insurance Number', 'text');
  const insuranceNumberInput = insuranceNumberControl.querySelector('input');
  if (insuranceNumberInput) {
    wireInput(insuranceNumberInput,() => state.form.insuranceNumber,(value) => {
      state.form.insuranceNumber = value;
      if(!value){ state.form.insuranceNumber='';}
    });
  }
  if(state.form.hasInsurance){
    insuranceNumberControl.style.display='block';
  }else{
    insuranceNumberControl.style.display='none';
  }


  /*consultation checkbox*/
  const consultationControl = createCheckbox('Pharmacist Consultation');
  const consultationCheckbox = consultationControl.querySelector<HTMLInputElement>('input[type="checkbox"]');

  if (consultationCheckbox) {
  wireCheckbox(
    consultationCheckbox,
    () => state.form.needsConsulatation,
    (value) => {
      state.form.needsConsulatation = value;
    }
  );
}
/*confirm control */
const confirmControl = createCheckbox('Confirm Identity');
const confirmCheckbox = confirmControl.querySelector<HTMLInputElement>('input[type="checkbox"]');

  if (confirmCheckbox) {
    wireCheckbox(
      confirmCheckbox,
      () => state.form.confirmIdentity,
      (value) => {
        state.form.confirmIdentity = value;
      }
    );
  }
  confirmationSection.appendChild(insuranceControl);
  confirmationSection.appendChild(insuranceNumberControl);
  errorRender(insuranceNumberControl,state.errors.insuranceNumber);
  confirmationSection.appendChild(consultationControl);
  confirmationSection.appendChild(confirmControl);
  errorRender(confirmControl,state.errors.confirmation);

  return confirmationSection;
}