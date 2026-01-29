
import type { FormMedication } from "../../types";

export function validateMedicationSection(
  medications: FormMedication[]
) {
  const hasAtLeastOneValid = medications.some(
    m => m.quantity >= 1 && m.quantity <= 12
  );

  if (!hasAtLeastOneValid) {
    return {
      valid: false,
      message: "Enter quantity for at least one medication"
    };
  }

  return { valid: true, message: "" };
}