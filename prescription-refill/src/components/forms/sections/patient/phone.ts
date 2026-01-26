import { createInput } from "../../elements/input-box";
import { wireInput } from "../../../../utils/wire-fns/wire-input";
import { state } from "../../../../states/app-state";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";

export function patientPhone():HTMLDivElement{
const phoneControl = createInput("Phone*", "tel");
const phoneInput = phoneControl.querySelector("input");
if(phoneInput) phoneInput.maxLength=10;

if (phoneInput) {
  wireInput(
    phoneInput,
    () => state.form.phone,
    (value) => {
      const phone = value.trim();
      state.form.phone = phone;
      if (!phone) {
        errorRender(phoneControl, "Phone number is required");
        return;
      }
      if (!/^\d+$/.test(phone)) {
        errorRender(phoneControl, "Only digits allowed");
        return;
      }
      if (phone.length !== 10) {
        errorRender(phoneControl, "Phone number must be 10 digits");
        return;
      }
      errorRender(phoneControl, "");
    }
  );
  phoneInput.addEventListener('blur',()=>{
    const phone=state.form.phone;
    if(!phone || !/^\d+$/.test(phone) || phone.length !== 10){
      state.errors.phone='phone no. is reqd';
    } else{state.errors.phone='';}
    errorRender(phoneControl,state.errors.phone);
  })
}
errorRender(phoneControl, state.errors.phone);
return phoneControl;
}