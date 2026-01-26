import { Form } from './forms/Form'
import { Table } from './tables/Table';
export function renderApp():void{
  const formContainer=document.getElementById('formContainer')
  const tableConatiner=document.getElementById('tableContent')
  if (!formContainer || !tableConatiner) {
    throw Error('reqd elements absent')
  }
  formContainer.innerHTML = '';
  tableConatiner.innerHTML = '';

  formContainer.appendChild(Form());
  tableConatiner.appendChild(Table());
}