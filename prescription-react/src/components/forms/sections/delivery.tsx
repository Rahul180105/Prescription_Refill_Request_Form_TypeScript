import React, { useState, type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import {
  validateDeliveryAddress,
  validateDeliveryMethod
} from "../../../validations/delivery";
import type { FormErrors } from "../../../types";

type DeliveryProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
  errors: Partial<FormErrors>;
};

export function Delivery({
  form,
  setForm,
  errors
}: DeliveryProps): ReactElement {
  const [addressTouched, setAddressTouched] = useState(false);
  const [methodTouched, setMethodTouched] = useState(false);

  const addressValidation = validateDeliveryAddress(
    form.deliveryAddress
  );
  const methodValidation = validateDeliveryMethod(
    form.deliveryMethod ?? ""
  );

  return (
    <div className="section delivery-section">
      {/* ---------- Address ---------- */}
      <div className={`input-control ${(addressTouched &&!addressValidation.valid) || errors.deliveryaddress ?'has-error':''}`}>
        <label>Delivery Address *</label>
        <textarea
          value={form.deliveryAddress}
          onChange={(e) => {
            setAddressTouched(true);
            setForm(prev => ({
              ...prev,
              deliveryAddress: e.target.value
            }));
          }}
          onBlur={() => setAddressTouched(true)}
        />

        {(addressTouched || errors.deliveryaddress)&&
          !addressValidation.valid && (
            <div className="error">
              {errors.deliveryaddress??
                addressValidation.message}
            </div>
          )}
      </div>

      {/* ---------- Delivery Method ---------- */}
      <div className="input-control">
        <label>Delivery Method *</label>

        {["SAME DAY", "STANDARD"].map((m) => (
          <label key={m}>
            <input
              type="radio"
              name="delivery"
              value={m}
              checked={form.deliveryMethod === m}
              onChange={() => {
                setMethodTouched(true);
                setForm(prev => ({
                  ...prev,
                  deliveryMethod: m
                }));
              }}
              onBlur={() => setMethodTouched(true)}
            />
            {m}
          </label>
        ))}

        {(methodTouched || errors.deliveryMethod) &&
          !methodValidation.valid && (
            <div className="error">
              {errors.deliveryMethod ??
                methodValidation.message}
            </div>
          )}
      </div>

      {/* ---------- Preferred Date ---------- */}
      <div className="input-control">
        <label>Preferred Delivery Date</label>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={form.preferredDeliveryDate}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              preferredDeliveryDate: e.target.value
            }))
          }
        />
      </div>

      {/* ---------- Instructions ---------- */}
      <div className="input-control">
        <label>Special Instructions</label>
        <textarea
          value={form.specialInstrucions}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              specialInstrucions: e.target.value
            }))
          }
        />
      </div>
    </div>
  );
}

export default Delivery;