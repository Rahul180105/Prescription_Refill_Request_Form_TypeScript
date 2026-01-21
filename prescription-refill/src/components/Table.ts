import { state } from "../app.state";
import { renderApp } from "./App";
import { saveRecords } from "../app.storage";

export function Table(): HTMLTableElement {
  const table = document.createElement("table");
  table.className = "data-table";

  /* ---------- HEADER ---------- */
  const headers = [
    "Patient ID",
    "Name",
    "Phone",
    "Email",
    "Medications",
    "Reason",
    "Other Reason",
    "Delivery Address",
    "Delivery Method",
    "Preferred Date",
    "Lasr approval Date",
    "Insurance",
    "Consultation",
    "Special Instructions",
    "Actions"
  ];

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  /* ---------- BODY ---------- */
  const tbody = document.createElement("tbody");

  state.records.forEach((record, index) => {
    const row = document.createElement("tr");

    /* SIMPLE TEXT CELLS */
    [
      record.patientId,
      record.patientName,
      record.phone,
      record.email
    ].forEach(value => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });

    /* MEDICATIONS (STACKED) */
    const medsTd = document.createElement("td");
    record.medications.forEach(med => {
      const line = document.createElement("div");
      line.textContent = `${med.name} (${med.dosage}) × ${med.quantity}`;
      medsTd.appendChild(line);
    });
    row.appendChild(medsTd);

    /* REASON */
    const reasonTd = document.createElement("td");
    reasonTd.textContent = record.reason;
    row.appendChild(reasonTd);

    const otherReasonTd = document.createElement("td");
    otherReasonTd.textContent = record.otherReason || "-";
    row.appendChild(otherReasonTd);

    /* DELIVERY */
    const addressTd = document.createElement("td");
    addressTd.textContent = record.deliveryAddress;
    row.appendChild(addressTd);

    const methodTd = document.createElement("td");
    methodTd.textContent = record.deliveryMethod;
    row.appendChild(methodTd);

    const dateTd = document.createElement("td");
    dateTd.textContent = record.preferredDeliveryDate || "-";
    row.appendChild(dateTd);


    const lastApprovalDateTd = document.createElement("td");
    lastApprovalDateTd.textContent = record.lastApprovalDate;
    row.appendChild(lastApprovalDateTd);

    
    /* FLAGS */
    const insuranceTd = document.createElement("td");
    insuranceTd.textContent = record.hasInsurance ? "Yes" : "No";
    row.appendChild(insuranceTd);

    const consultTd = document.createElement("td");
    consultTd.textContent = record.needsConsulatation ? "Yes" : "No";
    row.appendChild(consultTd);

    /* INSTRUCTIONS */
    const instrTd = document.createElement("td");
    instrTd.textContent = record.specialInstrucions || "-";
    row.appendChild(instrTd);

    /* ACTIONS */
    const actionsTd = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      state.editId = index;

      state.form = {
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

      renderApp();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      state.records.splice(index, 1);
      saveRecords();
      renderApp();
    });

    actionsTd.append(editBtn, deleteBtn);
    row.appendChild(actionsTd);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table;
}