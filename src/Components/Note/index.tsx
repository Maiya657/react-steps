export interface NoteData {
  date: string;
  distance: string;
}

interface NoteProps extends NoteData {
  onRemove: () => void;
  onEdit: () => void;
}

export default function Note({ date, distance, onRemove, onEdit }: NoteProps) {
  const removeHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onRemove();
  }
  const editHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onEdit();
  }

  return (
    <div className="note">
      <span>{date}</span>
      <span>{distance}</span>
      <div className="buttons">
        <button className="editBtn" onClick={editHandler}>
          ✎
        </button>
        <button className="removeBtn" onClick={removeHandler}>
          ✘
        </button>
      </div>
    </div>
  );
}