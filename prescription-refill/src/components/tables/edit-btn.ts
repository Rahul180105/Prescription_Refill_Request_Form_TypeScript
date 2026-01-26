import { populateEdit } from "./populate-edit";
import type { RefillRecord } from "../../types/refill-record";
import { resetFormState } from "../../utils/helpers/resetFormState";
import { state } from "../../states/app-state";
import { renderApp } from "../App";

export function editBtn(record:RefillRecord,index:number):HTMLButtonElement{
    const editBtn = document.createElement('button');
    editBtn.className='edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      resetFormState();
      state.editId = index;
      state.form = populateEdit(record);
      renderApp();
    });
    return editBtn;
}