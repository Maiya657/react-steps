import './App.css'
import { useState } from "react";
import { type NoteData } from "./Components/Note/Node";
import Table from "./Components/Table";
import Form from "./Components/Form";

function App() {
  const [dateField, setDateField] = useState<string>("");
  const [distanceField, setDistanceField] = useState<string>("");
  const [notes, setNotes] = useState<NoteData[]>([
    { date: '20.07.2019', distance: '5.7' },
    { date: '19.07.2019', distance: '14.2' },
    { date: '18.07.2019', distance: '3.4' },
  ]);
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  const editNoteHandler = (index: number): void => {
    const editingNote = notes.find((_, i) => i === index);

    if (editingNote) {
      setEditIndex(index);
      setDateField(editingNote.date.split(".").reverse().join("-"))
      setDistanceField(editingNote.distance);
    }
  }

  const deleteNoteHandler = (index: number): void => {
    setNotes((previousArr) => previousArr.filter((_, i) => i !== index));
  }

  return (
    <div className="mainContainer">
      <Form notes={notes} editIndex={editIndex} dateField={dateField} distanceField={distanceField} setEditIndex={setEditIndex}
        setNotes={setNotes} setDateField={setDateField} setDistanceField={setDistanceField} />
      <Table notes={notes} editNoteHandler={editNoteHandler} deleteNoteHandler={deleteNoteHandler} />
    </div>
  );
}

export default App