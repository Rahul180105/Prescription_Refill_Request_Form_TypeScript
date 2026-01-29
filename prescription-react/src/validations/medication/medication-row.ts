export function validateMedicationRow(quantity: number) {
  if (quantity === 0) {
    return { valid: true, message: "" }; 
  }

  if (quantity < 1 || quantity > 12) {
    return {
      valid: false,
      message: 'Quantity must be between 1 and 12'
    };
  }

  return { valid: true, message: "" };
}