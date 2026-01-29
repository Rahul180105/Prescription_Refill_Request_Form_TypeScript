
import Form from './components/forms/Form';
import Table from './components/tables/Table'
import { loadRecords } from './storage';
import type { RefillRecord } from './types/refill-record';
import { useEffect, useState } from 'react';
import ThemeToggle from './components/Theme';

function App() {
  const [records,setRecords] = useState<RefillRecord[]>([]);
  const [editingIndex,setEditingIndex]=useState<number|null>(null);
  useEffect(()=>{
    const stored=loadRecords();
    setRecords(stored);
  },[]);
 
  return (
    <>
      <ThemeToggle/>
      <div className="page-layout">
      <Form records={records} setRecords={setRecords} editingIndex={editingIndex} setEditingIndex={setEditingIndex} />
      <Table records={records} setRecords={setRecords} setEditingIndex={setEditingIndex}/>
      </div>
    </>
  )
}

export default App
