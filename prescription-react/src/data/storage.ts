import type { RefillRecord } from "../types/refill-record";

const KEY='refill-records';
export function saveRecords(records:RefillRecord[]){
    localStorage.setItem(KEY,JSON.stringify(records));
}

export function loadRecords():RefillRecord[]{
    const raw=localStorage.getItem(KEY);
    return raw?JSON.parse(raw):[];
}