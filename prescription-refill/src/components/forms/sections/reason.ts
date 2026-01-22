import { state } from "../../../app.state";
import { createRadioGroup } from "../elements/radio-grp";
import { createInput } from "../elements/input-box";
import { wireRadioGroup, wireInput } from "../../../utils/dom";
import { errorRender } from "../../../utils/error-helpers/error-render";

export function ReasonSection(): HTMLDivElement {
  const reasonSection = document.createElement("div");
  reasonSection.className = "section approval-reason";

  /* ---------------- Reason Radio ---------------- */
  const reasonControl = createRadioGroup("Reason for Refill", "reason", [
    "RUNNING OUT",
    "LOST",
    "TRAVELLING",
    "OTHER"
  ]);

  const reasonRadios =
    reasonControl.querySelectorAll<HTMLInputElement>('input[type="radio"]');

  wireRadioGroup(
    reasonRadios,
    () => state.form.reason,
    (value) => {
      state.form.reason = value;

      if (!value) {
        errorRender(reasonControl, "Please select a reason");
        return;
      }
      // if NOT other → reset other reason
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

      // valid reason selected
      errorRender(reasonControl, "");
    }
  );

  reasonSection.appendChild(reasonControl);
  errorRender(reasonControl, state.errors.reason);

  /* ---------------- Other Reason ---------------- */
  const otherReasonControl = createInput("Other Reason", "text");
  const otherReasonInput = otherReasonControl.querySelector("input");

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

  /* initially visibile */
  otherReasonControl.style.display =
    state.form.reason === "OTHER" ? "block" : "none";

  reasonSection.appendChild(otherReasonControl);
  errorRender(otherReasonControl, state.errors.otherReason);

  /* ------------ Approval Date ------------ */
  const approvalControl = createInput("Last Approval Date", "date");
  const approvalInput = approvalControl.querySelector("input");

  if (approvalInput) {
    approvalInput.value = state.form.lastApprovalDate;
    approvalInput.readOnly = true;
  }

  reasonSection.appendChild(approvalControl);

  return reasonSection;
}