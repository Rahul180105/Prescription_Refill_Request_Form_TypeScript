import { wireInput } from "../../../../utils/wire-fns/wire-input";
import { state } from "../../../../states/app-state";
import { todayDate } from "../../../../utils/helpers/today-date";
import { createInput } from "../../elements/input-box";

export function preferredDate():HTMLDivElement{
  const preferredDateControl = createInput("Preferred Delivery Date", "date");
  const preferredDateInput = preferredDateControl.querySelector("input");
  
  if (preferredDateInput) {
    preferredDateInput.min=todayDate();
    wireInput(
      preferredDateInput,
      () => state.form.preferredDeliveryDate,
      (value) => {
        state.form.preferredDeliveryDate = value;
      }
    );
  }
  return preferredDateControl;
}