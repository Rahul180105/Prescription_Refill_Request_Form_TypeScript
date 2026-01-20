import { state } from "../../../app.state";
import { createCheckbox,createInput } from "../form-elements";
import { wireCheckbox,wireInput } from "../../../utils/dom";

export function ConfirmSection():HTMLDivElement{
  const confirmationSection = document.createElement('div');
  confirmationSection.className = 'section confirmations';
  /*insurance checkbox*/
  const insuranceControl = createCheckbox('Insurance Coverage');
  const insuranceCheckbox =
  insuranceControl.querySelector<HTMLInputElement>('input[type="checkbox"]');

  if (insuranceCheckbox) {
    wireCheckbox(insuranceCheckbox,() => state.form.hasInsurance,(value) => {state.form.hasInsurance = value;});
 }
  /*insuranceNumber control */
  const insuranceNumberControl = createInput('Insurance Number', 'text');
  const insuranceNumberInput = insuranceNumberControl.querySelector('input');
  if (insuranceNumberInput) {
    wireInput(insuranceNumberInput,() => state.form.insuranceNumber,(value) => {state.form.insuranceNumber = value;});
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
  confirmationSection.appendChild(consultationControl);
  confirmationSection.appendChild(confirmControl);

  return confirmationSection;
}