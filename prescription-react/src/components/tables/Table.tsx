import React, { type ReactElement, useState } from "react";
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
    <div id="tableContainer" className="table-panel">
      <div id="tableContent">
        <h2>Saved Records</h2>

        {records.length === 0 ? (
          <p>No records saved</p>
        ) : (
          <table className="data-table">
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
                            m => `${m.name} (${m.dosage}) × ${m.quantity}`
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
                      ? record.insuranceNumber
                        ? `(${record.insuranceNumber})`
                        : "Yes"
                      : "No"}
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => setEditingIndex(index)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => confirmDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this record?</p>

            <div className='popup-actions'>
              <button className="btn secondary" onClick={handleDeleteConfirmed}>
                Delete
              </button>
              <button
                className="btn"
                onClick={() => {
                  setShowDeletePopup(false);
                  setDeleteIndex(null);
                }} >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Table;