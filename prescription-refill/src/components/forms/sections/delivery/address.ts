import { createTextarea } from "../../elements/text-area";
import { errorRender } from "../../../../utils/helpers/error-helpers/error-render";
import { state } from "../../../../states/app-state";
import { wireInput } from "../../../../utils/wire-fns/wire-input";


export function address():HTMLDivElement{
  const addressControl = createTextarea("Delivery Address*");
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
      const address=state.form.deliveryAddress;
      if(!address || address.length<5){
        state.errors.deliveryaddress='address is reqd';
      } else{state.errors.deliveryaddress='';}
      errorRender(addressControl,state.errors.deliveryaddress);
    })
  }
  errorRender(addressControl, state.errors.deliveryaddress);
  return addressControl;
}