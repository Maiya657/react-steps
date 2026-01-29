import { useState } from "react";
import Note from "../Note"; 
import { type NoteData } from "../Note";

function Form() {
  const [dateField, setDateField] = useState<string>("");
  const [distanceField, setDistanceField] = useState<string>("");
  const [notes, setNotes] = useState<NoteData[]>([
    {date: '20.07.2019', distance: '5.7'},
    {date: '19.07.2019', distance: '14.2'},
    {date: '18.07.2019', distance: '3.4'},
  ]);
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  const inputDateHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setDateField(value);

    if (value.length === 11) {
      const datePattern =/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
      if (!datePattern.test(value)) {
        alert("Введите дату в формате ДД.ММ.ГГГГ");
        setDateField("");
      }
    }
  }

  const inputDistanceHandler = (event: React.ChangeEvent<HTMLInputElement>): void  => {
    if (/^([\d]+[.]{0,1}[\d]*)$/.test(event.target.value)) {
      setDistanceField(event.target.value);
    } else {
      alert("Введите дистанцию в КМ");
      setDistanceField("");
      return;
    }
  }

  const okBtnHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("okBtnHandler вызван");
    event.preventDefault();
    if (dateField.length < 10) {
      alert("Введите дату в формате ДД.ММ.ГГГГ");
      return;
    } else if (!dateField || !distanceField) {
      alert("Введите данные");
      return;
    }

    const existDateIndex = notes.findIndex(
      (note) => note.date === dateField
    );
    let updatedNotes = [...notes];
    
    switch (true) {
      case (editIndex !== undefined && existDateIndex !== -1):
        updatedNotes[editIndex].distance = (Number(updatedNotes[existDateIndex].distance) + Number(distanceField)).toString();
        updatedNotes[editIndex].date = dateField;
        updatedNotes = updatedNotes.filter((_, i) => i !== existDateIndex).sort((a, b) => {
          const dateA = new Date(a.date.split(".").reverse().join("-"));
          const dateB = new Date(b.date.split(".").reverse().join("-"));
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case (editIndex !== undefined):
        updatedNotes[editIndex].distance = distanceField;
        updatedNotes[editIndex].date = dateField;
        setEditIndex(undefined);
        break;
      case (existDateIndex !== -1):
        updatedNotes[existDateIndex].distance = (Number(updatedNotes[existDateIndex].distance) + Number(distanceField)).toString();
        break;
      default:
        updatedNotes.push({ date: dateField, distance: distanceField })
        updatedNotes = updatedNotes.sort((a, b) => {
          const dateA = new Date(a.date.split(".").reverse().join("-"));
          const dateB = new Date(b.date.split(".").reverse().join("-"));
          return dateB.getTime() - dateA.getTime();
        });
        break;
    }

    setNotes(updatedNotes);
    setDateField("");
    setDistanceField("");
  }

  const editNoteHandler = (index: number): void => {
    const editingNote = notes.find((_, i) => i === index);

    if (editingNote) {
      setEditIndex(index);
      setDateField(editingNote.date)
      setDistanceField(editingNote.distance);
    }
  }

  const deleteNoteHandler = (index: number): void => {
    setNotes((previousArr) => previousArr.filter((_, i) => i !== index));
  }

  return (
    <div className="mainContainer">
      <div className="formContainer">
        <form className="form">
          <div className="formGroup">
            <label htmlFor="dateInput">{"Дата (ДД.ММ.ГГГГ.)"}</label>
            <input
              id="dateInput"
              onChange={inputDateHandler}
              value={dateField}
              className="field"
              type="text"
              placeholder="Введите дату"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="distanceInput">{"Пройдено км."}</label>
            <input
              id="distanceInput"
              onChange={inputDistanceHandler}
              value={distanceField}
              className="field"
              type="text"
              placeholder="Введите дистанцию"
            />
          </div>
          <button className="btn" type="button" onClick={okBtnHandler}>
            {"OK"}
          </button>
        </form>
      </div>
      <div className="titleContainer">
        <span>{"Дата (ДД.ММ.ГГГГ.)"}</span>
        <span>{"Пройдено км."}</span>
        <span>{"Действия"}</span>
      </div>
      <div className="notesContainer">
        {notes.map((note, index) => (
          <Note
            key={index}
            date={note.date}
            distance={note.distance}
            onRemove={() => deleteNoteHandler(index)}
            onEdit={() => editNoteHandler(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Form;