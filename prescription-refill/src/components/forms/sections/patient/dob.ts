import { createInput } from "../../elements/input-box";
import { state } from "../../../../states/app-state";

export function patientDob():HTMLDivElement{
    const dobControl = createInput("Date of Birth", "date");
    const dobInput = dobControl.querySelector("input");
    if (dobInput) {
      dobInput.value = state.form.dateOfBirth;
      dobInput.readOnly = true;
    }
    return dobControl;
}