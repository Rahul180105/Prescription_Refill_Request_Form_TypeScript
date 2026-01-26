import { createCheckbox } from "../../elements/check-box";
import { wireCheckbox } from "../../../../utils/wire-fns/wire-check";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";
import { state } from "../../../../states/app-state";

export function confirmCond():HTMLDivElement{
    const confirmControl = createCheckbox("Confirm Terms & Condition*");
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
    errorRender(confirmControl, state.errors.confirmation);
    return confirmControl;
    
}