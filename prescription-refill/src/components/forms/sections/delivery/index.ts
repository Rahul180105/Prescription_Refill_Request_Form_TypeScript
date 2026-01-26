import { address } from "./address";
import { deliveryMethod } from "./delivery-method";
import { preferredDate } from "./preferred-date";
import { specialInstructions } from "./special-instructions";

export function DeliverySection(): HTMLDivElement {
  const deliverySection = document.createElement("div");
  deliverySection.className = "section delivery-section";

  deliverySection.appendChild(address());
  deliverySection.appendChild(deliveryMethod());
  deliverySection.appendChild(preferredDate());
  deliverySection.appendChild(specialInstructions());

  return deliverySection;
}