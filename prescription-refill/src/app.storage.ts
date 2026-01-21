import { state } from "./app.state";
import type { RefillRecord } from "./types";

const STORAGE_KEY = "refill_records";

/* ---------- GETTER ---------- */
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

/* ---------- SETTER ---------- */
export function saveRecords(): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.records)
  );
}