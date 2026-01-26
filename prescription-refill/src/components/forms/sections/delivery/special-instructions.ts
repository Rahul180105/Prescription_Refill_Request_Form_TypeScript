import { createTextarea } from "../../elements/text-area";
import { wireInput } from "../../../../utils/wire-fns/wire-input";
import { state } from "../../../../states/app-state";

export function specialInstructions():HTMLDivElement{
  const instructionsControl = createTextarea("Special Instructions");
  const instructionsInput = instructionsControl.querySelector("textarea");

  if (instructionsInput) {
    wireInput(
      instructionsInput,
      () => state.form.specialInstrucions,
      (value) => {
        state.form.specialInstrucions = value;
      }
    );
  }
  return instructionsControl;

}