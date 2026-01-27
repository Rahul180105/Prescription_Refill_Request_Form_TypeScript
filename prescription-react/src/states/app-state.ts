import { initialFormState } from './initial-formstate';
import type { FormErrors } from '../types/form-errors';
import type { AppState } from '../types/app-state';
export type Theme = 'light'|'dark';

export const state:AppState={
  form:initialFormState,
  records:[],
  editId:null,
  errors:{} as FormErrors,
};
