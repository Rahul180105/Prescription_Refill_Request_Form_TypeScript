import { createRadioGroup } from "../../elements/radio-grp";
import { wireRadioGroup } from "../../../../utils/wire-fns/wire-radio";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";
import { state } from "../../../../states/app-state";

export function deliveryMethod():HTMLDivElement{
  const deliveryMethodControl = createRadioGroup("Delivery Method*", "delivery", [
    "SAME DAY",
    "STANDARD"
  ]);  
  const deliveryRadios =
    deliveryMethodControl.querySelectorAll<HTMLInputElement>(
      'input[type="radio"]'
    );  
  wireRadioGroup(
    deliveryRadios,
    () => state.form.deliveryMethod,
    (value) => {
      state.form.deliveryMethod = value;  
      if (!value) {
        errorRender(deliveryMethodControl, "Select a delivery method");
        return;
      }
      errorRender(deliveryMethodControl, "");
    }
  );
  errorRender(deliveryMethodControl, state.errors.deliveryMethod);
  return deliveryMethodControl;
}