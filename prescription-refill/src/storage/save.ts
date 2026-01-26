import { state } from "../states/app-state";
import { STORAGE_KEY } from "../constants/storage-key";

export function saveRecords(): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.records)
  );
}