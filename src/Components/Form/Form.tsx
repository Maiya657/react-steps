import { type SubmitEvent } from "react";
import type { NoteData } from "../Note/Node";

interface Props {
  notes: NoteData[]
  editIndex?: number
  dateField: string
  distanceField: string
  setEditIndex: React.Dispatch<React.SetStateAction<number | undefined>>
  setNotes: React.Dispatch<React.SetStateAction<NoteData[]>>
  setDateField: React.Dispatch<React.SetStateAction<string>>
  setDistanceField: React.Dispatch<React.SetStateAction<string>>
}

function Form({ notes, editIndex, dateField, distanceField, setEditIndex, setNotes, setDateField, setDistanceField }: Props) {
  const inputDateHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setDateField(value);

    if (value.length === 11) {
      const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;
      if (!datePattern.test(value)) {
        alert("Введите дату в формате ДД.ММ.ГГГГ");
        setDateField("");
      }
    }
  }

  const inputDistanceHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (/^([\d]+[.|,]{0,1}[\d]*)$/.test(event.target.value)) {
      setDistanceField(event.target.value);
    } else {
      alert("Введите дистанцию в КМ");
      setDistanceField("");
      return;
    }
  }

  const submitHandler = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formattedDate = dateField.split("-").reverse().join(".")
    if (dateField.length < 10) {
      alert("Введите дату в формате ДД.ММ.ГГГГ");
      return;
    } else if (!dateField || !distanceField) {
      alert("Введите данные");
      return;
    }

    const existDateIndex = notes.findIndex(
      (note) => note.date === formattedDate
    );
    let updatedNotes = [...notes];

    switch (true) {
      case (editIndex !== undefined && existDateIndex !== -1 && existDateIndex !== editIndex):
        updatedNotes[editIndex].distance = (Number(updatedNotes[existDateIndex].distance) + Number(distanceField)).toString();
        updatedNotes[editIndex].date = formattedDate;
        updatedNotes = updatedNotes.filter((_, i) => i !== existDateIndex).sort((a, b) => {
          const dateA = new Date(a.date.split(".").reverse().join("-"));
          const dateB = new Date(b.date.split(".").reverse().join("-"));
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case (editIndex !== undefined):
        updatedNotes[editIndex].distance = distanceField;
        updatedNotes[editIndex].date = formattedDate;
        setEditIndex(undefined);
        break;
      case (existDateIndex !== -1):
        updatedNotes[existDateIndex].distance = (Number(updatedNotes[existDateIndex].distance) + Number(distanceField)).toString();
        break;
      default:
        updatedNotes.push({ date: formattedDate, distance: distanceField })
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

  return (
    <div className="formContainer">
      <form className="form" onSubmit={submitHandler}>
        <div className="formGroup">
          <label htmlFor="dateInput">{"Дата (ДД.ММ.ГГГГ.)"}</label>
          <input
            id="dateInput"
            onChange={inputDateHandler}
            value={dateField}
            className="field"
            type="date"
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
            type="number"
            placeholder="Введите дистанцию"
          />
        </div>
        <button className="btn" type="submit">
          {"OK"}
        </button>
      </form>
    </div>
  )
}

export default Form