import { createCheckbox } from "../../elements/check-box";
import { createInput } from "../../elements/input-box";
import { state } from "../../../../states/app-state";
import { wireCheckbox } from "../../../../utils/wire-fns/wire-check";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";
import { wireInput } from "../../../../utils/wire-fns/wire-input";

export function insuranceHandle():[HTMLDivElement,HTMLDivElement]{
  const insuranceControl = createCheckbox("Insurance Coverage");
  const insuranceCheckbox = insuranceControl.querySelector<HTMLInputElement>('input[type="checkbox"]');
  const insuranceNumberControl = createInput("Insurance Number*", "text");
  const insuranceNumberInput = insuranceNumberControl.querySelector<HTMLInputElement>("input");

  if (insuranceCheckbox) {
    wireCheckbox(
      insuranceCheckbox,
      () => state.form.hasInsurance,
      (checked) => {
        state.form.hasInsurance = checked;

        if (checked) {
          insuranceNumberControl.style.display = "block";

          if (!state.form.insuranceNumber) {
            errorRender(
              insuranceNumberControl,
              "Insurance number is required"
            );
            
          }
        } else {
          insuranceNumberControl.style.display = "none";
          state.form.insuranceNumber = "";
          errorRender(insuranceNumberControl, "");
        }
      }
    );
  }

  if (insuranceNumberInput) {
    wireInput(
      insuranceNumberInput,
      () => state.form.insuranceNumber,
      (value) => {
        state.form.insuranceNumber = value.trim();

        if (state.form.hasInsurance && !state.form.insuranceNumber) {
          errorRender(
            insuranceNumberControl,
            "Insurance number is required"
          );
          return;
        }
        errorRender(insuranceNumberControl, "");
      }
    );
    insuranceNumberInput.addEventListener('blur',()=>{
      const insuranceNumber=state.form.insuranceNumber;
      if(!insuranceNumber){
        state.errors.insuranceNumber='insurance no. reqd';
      } else{state.errors.insuranceNumber='';}
      errorRender(insuranceNumberControl,state.errors.insuranceNumber);
    })
  }
  insuranceNumberControl.style.display = state.form.hasInsurance
    ? "block"
    : "none";
   errorRender(insuranceNumberControl, state.errors.insuranceNumber);
   return [insuranceControl,insuranceNumberControl];
}