import React, { type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";

type DeliveryProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
};

export function Delivery({ form, setForm }: DeliveryProps): ReactElement {
  return (
    <div className="section delivery-section">
      <div className="input-control">
        <label>Delivery Address *</label>
        <textarea
          value={form.deliveryAddress}
          onChange={(e) =>
            setForm({ ...form, deliveryAddress: e.target.value })
          }
        />
        <div className="error"></div>
      </div>

      <div className="input-control">
        <label>Delivery Method *</label>
        {["SAME DAY", "STANDARD"].map((m) => (
          <label key={m}>
            <input
              type="radio"
              name="delivery"
              value={m}
              checked={form.deliveryMethod === m}
              onChange={() =>
                setForm({ ...form, deliveryMethod: m })
              }
            />
            {m}
          </label>
        ))}
        <div className="error"></div>
      </div>

      <div className="input-control">
        <label>Preferred Delivery Date</label>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={form.preferredDeliveryDate}
          onChange={(e) =>
            setForm({ ...form, preferredDeliveryDate: e.target.value })
          }
        />
      </div>

      <div className="input-control">
        <label>Special Instructions</label>
        <textarea
          value={form.specialInstrucions}
          onChange={(e) =>
            setForm({ ...form, specialInstrucions: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default Delivery;