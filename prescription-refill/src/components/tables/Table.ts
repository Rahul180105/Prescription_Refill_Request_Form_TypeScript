import { state } from "../../states/app-state";
import { headers } from "../../constants/table-headers";
import { deleteBtn } from "./delete-btn";
import { editBtn } from "./edit-btn";

export function Table(): HTMLTableElement {
  const table = document.createElement("table");
  table.className = "data-table";
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  state.records.forEach((record, index) => {
    const row = document.createElement("tr");
    [record.patientId,record.patientName,record.phone,record.email].forEach(value => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });
    const medsTd = document.createElement("td");
    record.medications.forEach(med => {
      const line = document.createElement("div");
      line.textContent = `${med.name} (${med.dosage}) × ${med.quantity}`;
      medsTd.appendChild(line);
    });
    row.appendChild(medsTd);

    const reasonTd = document.createElement("td");
    reasonTd.textContent = record.reason;
    row.appendChild(reasonTd);

    const otherReasonTd = document.createElement("td");
    otherReasonTd.textContent = record.otherReason || "-";
    row.appendChild(otherReasonTd);

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
    const insuranceTd = document.createElement("td");
    insuranceTd.textContent = record.hasInsurance ? record.insuranceNumber : "No";
    row.appendChild(insuranceTd);
    const consultTd = document.createElement("td");
    consultTd.textContent = record.needsConsulatation ? "Yes" : "No";
    row.appendChild(consultTd);

    const instrTd = document.createElement("td");
    instrTd.textContent = record.specialInstrucions || "-";
    row.appendChild(instrTd);
    const actionsTd = document.createElement("td");
    actionsTd.append(editBtn(record,index), deleteBtn(index));
    row.appendChild(actionsTd);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
  return table;
}