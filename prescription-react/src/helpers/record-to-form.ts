import type { RefillFormState } from "../types/refill-formstate";
import type { RefillRecord } from "../types/refill-record";

export function recordToForm(record: RefillRecord): RefillFormState {
  return {
    patientId: record.patientId,
    patientName: record.patientName,
    dateOfBirth: record.dateOfBirth,
    phone: record.phone,
    email: record.email,
    reason: record.reason,
    otherReason: record.otherReason ?? "",
    deliveryAddress: record.deliveryAddress,
    deliveryMethod: record.deliveryMethod,
    preferredDeliveryDate: record.preferredDeliveryDate ?? '',
    specialInstrucions: record.specialInstrucions ?? '',
    hasInsurance: record.hasInsurance,
    insuranceNumber: record.insuranceNumber ?? "",
    needsConsulatation: record.needsConsulatation,
    confirmIdentity:false ,
    lastApprovalDate: record.lastApprovalDate,
    medications: record.medications.map(m => ({
      name: m.name,
      dosage: m.dosage,
      quantity: m.quantity
    }))
  };
}