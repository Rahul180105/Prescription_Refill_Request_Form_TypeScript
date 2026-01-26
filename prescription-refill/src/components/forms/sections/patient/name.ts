import { createInput } from "../../elements/input-box";
import { state } from "../../../../states/app-state";

export function patientName():HTMLDivElement{
    const nameControl = createInput("Patient Name", "text");
    const nameInput = nameControl.querySelector("input");
    if (nameInput) {
      nameInput.value = state.form.patientName;
      nameInput.readOnly = true;
    }
    return nameControl;
}