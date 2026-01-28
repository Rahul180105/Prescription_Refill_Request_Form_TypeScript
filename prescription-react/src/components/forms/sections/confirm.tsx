import React, { type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";

type ConfirmProps = {
  form: RefillFormState;
  setForm: React.Dispatch<React.SetStateAction<RefillFormState>>;
};

export function Confirm({ form, setForm }: ConfirmProps): ReactElement {
  return (
    <div className="section confirmations">

      <div className="input-control">
        <label>
          <input
            type="checkbox"
            checked={form.hasInsurance}
            onChange={(e) =>
              setForm({ ...form, hasInsurance: e.target.checked })
            }
          />
          Do you have Insurance
        </label>

        {form.hasInsurance && (
          <div className="insurance-number-collection">
            <label>Insurance Number</label>
            <input
              type="text"
              value={form.insuranceNumber}
              onChange={(e) =>
                setForm({ ...form, insuranceNumber: e.target.value })
              }
            />
            <div className="error"></div>
          </div>
        )}
      </div>

      <div className="input-control">
        <label>
          <input
            type="checkbox"
            checked={form.needsConsulatation}
            onChange={(e) =>
              setForm({ ...form, needsConsulatation: e.target.checked })
            }
          />
          Do you need Consultation
        </label>
      </div>

      <div className="input-control">
        <label>
          <input
            type="checkbox"
            checked={form.confirmIdentity}
            onChange={(e) =>
              setForm({ ...form, confirmIdentity: e.target.checked })
            }
          />
          Terms and Conditions
        </label>
        <div className="error"></div>
      </div>

    </div>
  );
}

export default Confirm;