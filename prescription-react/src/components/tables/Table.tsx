import { useState } from "react";
import type { RefillRecord } from "../../types/refill-record";
import { saveRecords } from "../../data/storage";

interface TableProps {
  records: RefillRecord[];
  setRecords: React.Dispatch<React.SetStateAction<RefillRecord[]>>;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Table({
  records,
  setRecords,
  setEditingIndex,
}: TableProps) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  function confirmDelete(index: number) {
    setDeleteIndex(index);
    setShowDeletePopup(true);
  }

  function handleDeleteConfirmed() {
    if (deleteIndex === null) return;

    setRecords(prev => {
      const updated = prev.filter((_, i) => i !== deleteIndex);
      saveRecords(updated);
      return updated;
    });

    setShowDeletePopup(false);
    setDeleteIndex(null);
  }

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow
                    dark:bg-slate-900">
      <h2 className="mb-4 text-center text-lg font-semibold text-slate-800 dark:text-slate-100">
        Saved Records
      </h2>

      {records.length === 0 ? (
        <p className="text-center text-slate-500">No records saved</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {[
                  "Patient ID",
                  "Name",
                  "Phone",
                  "Email",
                  "Medications",
                  "Reason",
                  "Delivery",
                  "Preferred Date",
                  "Insurance",
                  "Actions",
                ].map(h => (
                  <th key={h} className="border-b px-3 py-2 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-slate-900 dark:text-slate-100">
              {records.map((r, i) => (
                <tr
                  key={i}
                  className={`border-b
                    ${i % 2 === 0
                      ? "bg-white dark:bg-slate-900"
                      : "bg-blue-50 dark:bg-slate-800"
                    }`}
                >
                  <td className="px-3 py-2">{r.patientId}</td>
                  <td className="px-3 py-2">{r.patientName}</td>
                  <td className="px-3 py-2">{r.phone}</td>
                  <td className="px-3 py-2">{r.email}</td>

                  <td className="px-3 py-2">
                    {r.medications.length === 0
                      ? "—"
                      : r.medications
                          .map(m => `${m.name} (${m.dosage}) × ${m.quantity}`)
                          .join(", ")}
                  </td>

                  <td className="px-3 py-2">{r.reason}</td>
                  <td className="px-3 py-2">{r.deliveryMethod}</td>
                  <td className="px-3 py-2">
                    {r.preferredDeliveryDate || "—"}
                  </td>
                  <td className="px-3 py-2">
                    {r.hasInsurance
                      ? r.insuranceNumber || "Yes"
                      : "No"}
                  </td>

                  <td className="px-3 py-2 space-x-3">
                    <button
                      onClick={() => setEditingIndex(i)}
                      className="font-semibold text-blue-600 hover:underline"
                    >✏️
                    </button>
                    <button
                      onClick={() => confirmDelete(i)}
                      className="font-semibold text-red-600 hover:underline"
                    >🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

  
      {showDeletePopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center
                  bg-black/50 dark:bg-black/70">
    <div className="
      w-80 rounded-xl p-5 shadow-xl
      bg-white text-slate-800
      dark:bg-slate-800 dark:text-slate-100
      border border-slate-200 dark:border-slate-700
    ">
      <h3 className="mb-2 text-lg font-semibold">
        Confirm Delete
      </h3>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Are you sure you want to delete this record?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowDeletePopup(false)}
          className="
            rounded-md px-3 py-1.5 text-sm font-medium
            bg-slate-100 text-slate-700
            hover:bg-slate-200
            dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600
          "
        >
          Cancel
        </button>

        <button
          onClick={handleDeleteConfirmed}
          className="
            rounded-md px-3 py-1.5 text-sm font-semibold
            bg-red-600 text-white
            hover:bg-red-700
          "
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}