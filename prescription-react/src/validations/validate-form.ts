import {
  validateEmail,
  validatePatientId,
  validatePhone
} from "./patients";
import {
  validateDeliveryAddress,
  validateDeliveryMethod
} from "./delivery";
import {
  validateIdentity,
  validateInsurance
} from "./confirm";
import {
  validateReason,
  validateOtherReason
} from "./reason";
import {
  validateMedicationSection
} from "./medication";

import type { RefillFormState } from "../types";
import type { FormErrors } from "../types/form-errors";

export function validateForm(form: RefillFormState) {
  const errors: FormErrors = {};

  /* ---------- Patient ---------- */
  if (!validatePatientId(form.patientId).valid) {
    errors.patientId = "Invalid patient ID";
  }

  if (!validatePhone(form.phone).valid) {
    errors.phone = "Phone number must be 10 digits";
  }

  if (!validateEmail(form.email).valid) {
    errors.email = "Invalid email address";
  }

  /* ---------- Reason ---------- */
  if (!validateReason(form.reason ?? "").valid) {
    errors.reason = "Please select a reason";
  }

  if (
    form.reason === "OTHER" &&
    !validateOtherReason(form.reason,form.otherReason ).valid
  ) {
    errors.otherReason = "Please specify the reason";
  }

  /* ---------- Delivery ---------- */
  if (!validateDeliveryAddress(form.deliveryAddress).valid) {
    errors.deliveryaddress="Delivery address is required";
  }

  if (!validateDeliveryMethod(form.deliveryMethod ?? "").valid) {
    errors.deliveryMethod = "Select a delivery method";
  }

  /* ---------- Medications ---------- */
  if (!validateMedicationSection(form.medications).valid) {
    errors.medications =
      "Enter quantity for at least one medication (1–12)";
  }

  /* ---------- Confirmations ---------- */
  if (!validateIdentity(form.confirmIdentity).valid) {
    errors.confirmation="You must confirm identity";
  }

  if (
    !validateInsurance(
      form.hasInsurance,
      form.insuranceNumber
    ).valid
  ) {
    errors.insuranceNumber = "Insurance number required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}