import { createTextarea } from "../elements/text-area"; 
import { createRadioGroup } from "../elements/radio-grp";
import { createInput } from "../elements/input-box";
import { wireInput, wireRadioGroup } from "../../../utils/dom";
import { state } from "../../../app.state";
import { errorRender } from "../../../utils/error-helpers/error-render";
import { todayDate } from "../../../utils/today-date";

export function DeliverySection(): HTMLDivElement {
  const deliverySection = document.createElement("div");
  deliverySection.className = "section delivery-section";

  /* -----------Delivery Address-------------- */
  const addressControl = createTextarea("Delivery Address");
  const addressInput = addressControl.querySelector("textarea");

  if (addressInput) {
    wireInput(
      addressInput,
      () => state.form.deliveryAddress,
      (value) => {
        const address = value.trim();
        state.form.deliveryAddress = address;

        if (!address) {
          errorRender(addressControl, "Delivery address is required");
          return;
        }

        if (address.length < 5) {
          errorRender(addressControl, "Address is too short");
          return;
        }
        errorRender(addressControl, "");
      }
    );
    addressInput.addEventListener('blur',()=>{
      const phone=state.form.phone;
      if(!phone){
        state.errors.deliveryaddress='address is reqd';
      } else{state.errors.deliveryaddress='';}
      errorRender(addressControl,state.errors.deliveryaddress);
    })
  }

  deliverySection.appendChild(addressControl);
  errorRender(addressControl, state.errors.deliveryaddress);

  /* -------------Delivery Method-------------- */
  const deliveryMethodControl = createRadioGroup("Delivery Method", "delivery", [
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

  deliverySection.appendChild(deliveryMethodControl);
  errorRender(deliveryMethodControl, state.errors.deliveryMethod);

  /* ---------------- Preferred Date (optional) ---------------- */
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

  deliverySection.appendChild(preferredDateControl);

  /* ---------------- Special Instructions (optional) ---------------- */
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

  deliverySection.appendChild(instructionsControl);

  return deliverySection;
}