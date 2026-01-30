import Note from "../Note/Node";
import type { NoteData } from "../Note/Node"

interface Props {
  notes: NoteData[]
  editNoteHandler: (index: number) => void
  deleteNoteHandler: (index: number) => void
}

function Table({ notes, editNoteHandler, deleteNoteHandler }: Props) {
  return (
    <>
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
    </>
  )
}

export default Table