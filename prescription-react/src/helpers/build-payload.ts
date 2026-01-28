import type { RefillFormState } from "../types/refill-formstate";
import type { RefillRecord } from "../types/refill-record";

export function buildPayload(form:RefillFormState):RefillRecord{
    return{
        patientId:form.patientId,
        patientName:form.patientName,
        dateOfBirth:form.dateOfBirth,
        lastApprovalDate:form.lastApprovalDate,
        phone:form.phone,
        email:form.email,
        medications:form.medications.filter(m=>(m.quantity!=null)&&m.quantity>=0).map(m=>({
            name:m.name,
            dosage:m.dosage,
            quantity:m.quantity
        })),
        reason:form.reason??'',
        otherReason:form.reason === 'OTHER'?form.otherReason:undefined,
        deliveryAddress:form.deliveryAddress,
        deliveryMethod:form.deliveryMethod??'',
        preferredDeliveryDate:form.preferredDeliveryDate,
        specialInstrucions:form.specialInstrucions,
        hasInsurance:form.hasInsurance,
        insuranceNumber:form.hasInsurance?form.insuranceNumber:undefined,
        needsConsulatation:form.needsConsulatation

    };
}