import { state } from "../states/app-state";
import type { RefillRecord } from "../types/refill-record";
import { STORAGE_KEY } from "../constants/storage-key";

export function loadRecords(): void {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    state.records = [];
    return;
  }

  try {
    state.records = JSON.parse(raw) as RefillRecord[];
  } catch {
    state.records = [];
  }
}