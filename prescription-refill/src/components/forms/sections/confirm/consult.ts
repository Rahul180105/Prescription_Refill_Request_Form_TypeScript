import { wireCheckbox } from "../../../../utils/wire-fns/wire-check";
import { state } from "../../../../states/app-state";
import { createCheckbox } from "../../elements/check-box";

export function consultation():HTMLDivElement{
  const consultationControl = createCheckbox("Pharmacist Consultation");
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
  return consultationControl;
}