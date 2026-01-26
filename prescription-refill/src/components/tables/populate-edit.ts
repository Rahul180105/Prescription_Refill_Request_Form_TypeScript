import type { RefillFormState } from "../../types/refill-formstate";
import type { RefillRecord } from "../../types/refill-record";

export function populateEdit(record:RefillRecord):RefillFormState{
    return {
        patientId: record.patientId,
        patientName: record.patientName,
        dateOfBirth: record.dateOfBirth,
        lastApprovalDate: record.lastApprovalDate,
        phone: record.phone,
        email: record.email,
        medications: record.medications.map(m => ({ ...m })),
        reason: record.reason,
        otherReason: record.otherReason,
        deliveryAddress: record.deliveryAddress,
        deliveryMethod: record.deliveryMethod,
        preferredDeliveryDate: record.preferredDeliveryDate,
        hasInsurance: record.hasInsurance,
        insuranceNumber: record.insuranceNumber,
        needsConsulatation: record.needsConsulatation,
        specialInstrucions: record.specialInstrucions,
        confirmIdentity: false
    };
}