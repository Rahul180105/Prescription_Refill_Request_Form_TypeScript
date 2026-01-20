import { createTextarea,createRadioGroup,createInput } from "../form-elements";
import { wireInput,wireRadioGroup } from "../../../utils/dom";
import { state } from "../../../app.state";


export function DeliverySection():HTMLDivElement{
     const deliverySection = document.createElement('div');
      deliverySection.className = 'section delivery-section';
    
      /*WIRE INPUT FOR AREA*/
      const addressControl = createTextarea('Delivery Address');
      const addressInput = addressControl.querySelector('textarea');
      if (addressInput) {
        wireInput(addressInput,() => state.form.deliveryAddress,(value) => {state.form.deliveryAddress = value;});
      }
      deliverySection.appendChild(addressControl)
      
      const deliveryMethodControl=createRadioGroup('Delivery Method', 'delivery', [
        'SAME DAY',
        'STANDARD'
      ]);
      const deliveryRadios=deliveryMethodControl.querySelectorAll<HTMLInputElement>('input[type="radio"]');
      wireRadioGroup(deliveryRadios,()=>state.form.deliveryMethod,(value)=>{state.form.deliveryMethod=value});
      deliverySection.appendChild(deliveryMethodControl);
    
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
      deliverySection.appendChild(createTextarea('Special Instructions'));
    
    return deliverySection;
}