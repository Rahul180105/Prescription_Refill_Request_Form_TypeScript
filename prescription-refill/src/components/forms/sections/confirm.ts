import { state } from "../../../app.state";
import { createCheckbox } from "../elements/check-box";
import { createInput } from "../elements/input-box";
import { wireCheckbox, wireInput } from "../../../utils/dom";
import { errorRender } from "../../../utils/error-helpers/error-render";

export function ConfirmSection(): HTMLDivElement {
  const confirmationSection = document.createElement("div");
  confirmationSection.className = "section confirmations";


  const insuranceControl = createCheckbox("Insurance Coverage");
  const insuranceCheckbox = insuranceControl.querySelector<HTMLInputElement>('input[type="checkbox"]');

  const insuranceNumberControl = createInput("Insurance Number", "text");
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

  confirmationSection.appendChild(insuranceControl);
  confirmationSection.appendChild(insuranceNumberControl);
  errorRender(insuranceNumberControl, state.errors.insuranceNumber);


  const consultationControl = createCheckbox("Pharmacist Consultation");
  const consultationCheckbox =
    consultationControl.querySelector<HTMLInputElement>('input[type="checkbox"]');

  if (consultationCheckbox) {
    wireCheckbox(
      consultationCheckbox,
      () => state.form.needsConsulatation,
      (value) => {
        state.form.needsConsulatation = value;
      }
    );
  }

  confirmationSection.appendChild(consultationControl);

  const confirmControl = createCheckbox("Confirm To Terms & Condition");
  const confirmCheckbox = confirmControl.querySelector<HTMLInputElement>('input[type="checkbox"]');

  if (confirmCheckbox) {
    wireCheckbox(
      confirmCheckbox,
      () => state.form.confirmIdentity,
      (value) => {
        state.form.confirmIdentity = value;

        if (!value) {
          errorRender(confirmControl, "You must confirm identity");
          return;
        }

   
        errorRender(confirmControl, "");
      }
    );
  }

  confirmationSection.appendChild(confirmControl);
  errorRender(confirmControl, state.errors.confirmation);

  return confirmationSection;
}