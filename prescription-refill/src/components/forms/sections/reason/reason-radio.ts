import { createRadioGroup } from "../../elements/radio-grp";
import { wireRadioGroup } from "../../../../utils/wire-fns/wire-radio";
import { state } from "../../../../states/app-state";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";
import { createInput } from "../../elements/input-box";
import { wireInput } from "../../../../utils/wire-fns/wire-input";

export function reasonRadio():[HTMLDivElement,HTMLDivElement]{
     const reasonControl = createRadioGroup("Reason for Refill*", "reason", [
        "RUNNING OUT",
        "LOST",
        "TRAVELLING",
        "OTHER"
      ]);
    
      const reasonRadios = reasonControl.querySelectorAll<HTMLInputElement>('input[type="radio"]');
      const otherReasonControl = createInput("Other Reason", "text");
      const otherReasonInput = otherReasonControl.querySelector("input");
      wireRadioGroup(
        reasonRadios,
        () => state.form.reason,
        (value) => {
          state.form.reason = value;
    
          if (!value) {
            errorRender(reasonControl, "Please select a reason");
            return;
          }
          if (value !== "OTHER") {
            state.form.otherReason = "";
            errorRender(otherReasonControl, "");
            otherReasonControl.style.display = "none";
          } else {
            otherReasonControl.style.display = "block";
    
            if (!state.form.otherReason) {
              errorRender(otherReasonControl, "Please specify the reason");
            }
          }
          errorRender(reasonControl, "");
        }
      );
    errorRender(reasonControl, state.errors.reason);

      if (otherReasonInput) {
    wireInput(
      otherReasonInput,
      () => state.form.otherReason,
      (value) => {
        state.form.otherReason = value.trim();

        if (
          state.form.reason === "OTHER" &&
          !state.form.otherReason
        ) {
          errorRender(
            otherReasonControl,
            "Please specify the reason"
          );
          return;
        }
        errorRender(otherReasonControl, "");
      }
    );
    otherReasonInput.addEventListener('blur',()=>{
      const otherReason=state.form.otherReason;
      if(!otherReason){
        state.errors.otherReason='reason is required';
      } else{state.errors.otherReason='';}
      errorRender(otherReasonControl,state.errors.otherReason);
    })

  }
  otherReasonControl.style.display =
  state.form.reason === "OTHER" ? "block" : "none";
   errorRender(otherReasonControl, state.errors.otherReason);
  return [reasonControl,otherReasonControl];
    
}