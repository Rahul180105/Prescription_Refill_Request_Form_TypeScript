import { useState, type ReactElement } from "react";
import type { RefillFormState } from "../../../types/refill-formstate";
import {
  validateDeliveryAddress,
  validateDeliveryMethod,
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
  errors,
}: DeliveryProps): ReactElement {
  const [addressTouched, setAddressTouched] = useState(false);
  const [methodTouched, setMethodTouched] = useState(false);

  const addressValidation = validateDeliveryAddress(form.deliveryAddress);
  const methodValidation = validateDeliveryMethod(form.deliveryMethod ?? "");

  const showAddressError =
    (addressTouched || errors.deliveryaddress) &&
    !addressValidation.valid;

  const showMethodError =
    (methodTouched || errors.deliveryMethod) &&
    !methodValidation.valid;

  return (
    <div className="mt-6 space-y-6">

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
          Delivery Address *
        </label>

        <textarea
          value={form.deliveryAddress}
          onChange={e => {
            setAddressTouched(true);
            setForm(prev => ({
              ...prev,
              deliveryAddress: e.target.value,
            }));
          }}
          onBlur={() => setAddressTouched(true)}
          className={`
              w-full rounded-lg px-3 py-2 text-sm
              bg-white text-slate-90
              focus:outline-none
              dark:bg-slate-800 dark:text-slate-100

              ${
                showAddressError
                  ? "border-red-500 ring-2 ring-red-400/30"
                  : "border-slate-300 focus:ring-2 focus:ring-blue-500 dark:border-slate-700"
              }
            `}
        />

        {showAddressError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.deliveryaddress ?? addressValidation.message}
          </p>
        )}
      </div>


      <div>
        <p className="mb-2 text-sm font-medium text-slate-70 dark:text-slate-300">
          Delivery Method *
        </p>

        <div className="space-y-3">
          {["SAME DAY", "STANDARD"].map(method => (
            <label
              key={method}
              className="flex items-center gap-3 text-sm text-slate-70 dark:text-slate-300"
            >
              <input
                type="radio"
                name="delivery"
                checked={form.deliveryMethod === method}
                onChange={() => {
                  setMethodTouched(true);
                  setForm(prev => ({
                    ...prev,
                    deliveryMethod: method,
                  }));
                }}
                onBlur={() => setMethodTouched(true)}
                className="
                  h-4 w-4
                  border-slate-300
                  text-blue-600
                  focus:ring-2 focus:ring-blue-500
                  dark:border-slate-600 dark:bg-slate-800
                "
              />
              {method}
            </label>
          ))}
        </div>

        {showMethodError && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.deliveryMethod ?? methodValidation.message}
          </p>
        )}
      </div>

 
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
          Preferred Delivery Date
        </label>

        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={form.preferredDeliveryDate}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              preferredDeliveryDate: e.target.value,
            }))
          }
          className="
            w-full rounded-lg px-3 py-2 text-sm
            bg-white text-slate-900
            border border-slate-300
            focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100
          "
        />
      </div>


      <div>
        <label className="mb-1 block text-sm font-medium text-slate-70 dark:text-slate-300">
          Special Instructions
        </label>

        <textarea
          value={form.specialInstrucions}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              specialInstrucions: e.target.value,
            }))
          }
          className="
            w-full rounded-lg px-3 py-2 text-sm
            bg-white text-slate-90
            border border-slate-300
            focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100
          "
        />
      </div>
    </div>
  );
}

export default Delivery;