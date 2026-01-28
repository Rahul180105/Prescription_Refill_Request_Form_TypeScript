import React, { type ReactElement } from "react";
import type { RefillRecord } from "../../types/refill-record";
import { saveRecords } from "../../storage";

interface TableProps {
  records: RefillRecord[];
  setRecords: React.Dispatch<React.SetStateAction<RefillRecord[]>>;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export function Table({
  records,
  setRecords,
  setEditingIndex
}: TableProps): ReactElement {

  function handleDelete(index: number) {
    const ok = window.confirm("Are you sure you want to delete this record?");
    if (!ok) return;

    setRecords(prev => {
      const updated = prev.filter((_, i) => i !== index);
      saveRecords(updated);
      return updated;
    });
  }

  return (
    <div id="tableContainer" className="table-panel">
      <div id="tableContent">

        <h2>Saved Records</h2>

        {records.length === 0 ? (
          <p>No records saved</p>
        ) : (
          <table className="records-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Medications</th>
                <th>Reason</th>
                <th>Delivery</th>
                <th>Preferred Date</th>
                <th>Insurance</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{record.patientId}</td>
                  <td>{record.patientName}</td>
                  <td>{record.phone}</td>
                  <td>{record.email}</td>

                  <td>
                    {record.medications.length === 0
                      ? "—"
                      : record.medications
                          .map(
                            m =>
                              `${m.name} (${m.dosage}) × ${m.quantity}`
                          )
                          .join(", ")}
                  </td>

                  <td>
                    {record.reason}
                    {record.reason === "OTHER" && record.otherReason
                      ? `: ${record.otherReason}`
                      : ""}
                  </td>

                  <td>{record.deliveryMethod}</td>
                  <td>{record.preferredDeliveryDate || "—"}</td>

                  <td>
                    {record.hasInsurance
                      ? `Yes (${record.insuranceNumber})`
                      : "No"}
                  </td>

                  <td>
                    <button onClick={() => setEditingIndex(index)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}

export default Table;