import { createTextarea } from "../elements/text-area"; 
import { createRadioGroup } from "../elements/radio-grp";
import { createInput } from "../elements/input-box";
import { wireInput,wireRadioGroup } from "../../../utils/dom";
import { state } from "../../../app.state";
import { errorRender } from "../../../utils/error-helpers/error-render";


export function DeliverySection():HTMLDivElement{
     const deliverySection = document.createElement('div');
      deliverySection.className = 'section delivery-section';
    
      /*WIRE INPUT FOR AREA*/
      const addressControl = createTextarea('Delivery Address');
      const addressInput = addressControl.querySelector('textarea');
      if (addressInput) {
        wireInput(addressInput,() => state.form.deliveryAddress,(value) => {state.form.deliveryAddress = value;});
      }
      deliverySection.appendChild(addressControl);
      errorRender(addressControl,state.errors.deliveryaddress);
      
      const deliveryMethodControl=createRadioGroup('Delivery Method', 'delivery', [
        'SAME DAY',
        'STANDARD'
      ]);
      const deliveryRadios=deliveryMethodControl.querySelectorAll<HTMLInputElement>('input[type="radio"]');
      wireRadioGroup(deliveryRadios,()=>state.form.deliveryMethod,(value)=>{state.form.deliveryMethod=value});
      deliverySection.appendChild(deliveryMethodControl);
      errorRender(deliveryMethodControl,state.errors.deliveryMethod);
    
      const preferredDateControl = createInput('Preferred Delivery Date', 'date');
      const preferredDateInput = preferredDateControl.querySelector('input');
      if (preferredDateInput) {
        wireInput(
          preferredDateInput,
          () => state.form.preferredDeliveryDate,
          (value) => {
            state.form.preferredDeliveryDate = value;
          }
        );
      }
      deliverySection.appendChild(preferredDateControl);
      const instructionsControl = createTextarea('Special Instructions');
      const instructionsInput = instructionsControl.querySelector('textarea');
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