import { useEffect, useState } from "react";
import Form from "./components/forms/Form";
import Table from "./components/tables/Table";
import { ThemeToggle } from "./components/Theme";
import { loadRecords } from "./data/storage";
import type { RefillRecord } from "./types/refill-record";

function App() {
  const [records, setRecords] = useState<RefillRecord[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setRecords(loadRecords());
  }, []);


  useEffect(() => {
    if (editingIndex !== null) {
      setShowForm(true);
    }
  }, [editingIndex]);

  return (
    <>
      <ThemeToggle />

      <div className="page-layout">
      
        {!showForm && (
          <>
            <Table
              records={records}
              setRecords={setRecords}
              setEditingIndex={setEditingIndex}
            />

            {/* ADD BUTTON */}
            <button
              onClick={() => {
                setEditingIndex(null);
                setShowForm(true);
              }}
              className="
                fixed top-6 left-6 z-50
                rounded-full bg-blue-600
                px-5 py-3
                text-white font-semibold
                shadow-lg
                hover:bg-blue-700
              "
            >
              + Add
            </button>
          </>
        )}

       
        {showForm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 relative">
              
              {/* CLOSE BUTTON */}
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                ❌
              </button>

              <Form
                records={records}
                setRecords={setRecords}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;