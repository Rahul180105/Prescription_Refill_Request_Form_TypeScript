import type { RefillFormState } from "../../../types/refill-formstate";
import type { FormErrors } from "../../../types/form-errors";
import { findPatientById } from "../../../utils/helpers/find-patientid";

export function validateForm(form: RefillFormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.patientId.trim()) {
    errors.patientId = "Patient ID is required";
  } else if (!findPatientById(form.patientId)) {
    errors.patientId = "Invalid Patient ID";
  }
  if (!/^\d{10}$/.test(form.phone)) {
    errors.phone = "Phone number must be exactly 10 digits";
  }

  if (!form.email.includes("@") || !form.email.includes(".")) {
    errors.email = "Enter a valid email address";
  }


  const hasValidMedication = form.medications.some(
    (m) => typeof m.quantity === "number" && m.quantity >= 1 && m.quantity <= 12
  );

  if (!hasValidMedication) {
    errors.medications = "Select at least one medication quantity (1–12)";
  }

  if (!form.reason) {
    errors.reason = "Please select a reason for refill";
  }

  if (form.reason === "OTHER" && !form.otherReason.trim()) {
    errors.otherReason = "Please specify the other reason";
  }

  if (!form.deliveryAddress.trim()) {
    errors.deliveryaddress = "Delivery address is required";
  }

  if (!form.deliveryMethod) {
    errors.deliveryMethod = "Please select a delivery method";
  }


  if (form.hasInsurance && !form.insuranceNumber.trim()) {
    errors.insuranceNumber = "Insurance number is required";
  }


  if (!form.confirmIdentity) {
    errors.confirmation = "You must confirm identity to proceed";
  }

  return errors;
}