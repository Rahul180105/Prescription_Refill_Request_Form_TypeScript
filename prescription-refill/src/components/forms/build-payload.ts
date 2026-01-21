import type { RefillFormState, RefillRecord } from "../../types";

export function BuildPayload(form:RefillFormState):RefillRecord{
  return {
    patientId: form.patientId,
    patientName: form.patientName,
    dateOfBirth: form.dateOfBirth,
    lastApprovalDate: form.lastApprovalDate,
    phone: form.phone,
    email: form.email,
    medications: form.medications
      .filter(m => m.quantity != null)
      .map(m => ({
        name: m.name,
        dosage: m.dosage,
        quantity: m.quantity as number
      })),
    reason: form.reason?? "",
    otherReason:
      form.reason === 'OTHER'
        ? form.otherReason
        : "",
    deliveryAddress: form.deliveryAddress,
    deliveryMethod: form.deliveryMethod?? "",
    hasInsurance:form.hasInsurance,
    insuranceNumber:
      form.hasInsurance
        ? form.insuranceNumber
        : '',
    needsConsulatation: form.needsConsulatation,
    preferredDeliveryDate: form.preferredDeliveryDate || "",
    specialInstrucions: form.specialInstrucions
  }
}