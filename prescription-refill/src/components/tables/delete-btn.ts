import { state } from "../../states/app-state";
import { saveRecords } from "../../storage/save";
import { resetFormState } from "../../utils/helpers/resetFormState";
import { renderApp } from "../App";
import { createDeletePopup } from "./delete-modal";

export function deleteBtn(index: number): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.className = "delete-btn"
  btn.textContent = "Delete";

  btn.addEventListener("click", () => {
    const popup = createDeletePopup(() => {
      state.records.splice(index, 1);
      resetFormState();
      saveRecords();
      renderApp();
    });

    document.body.appendChild(popup);
  });

  return btn;
}