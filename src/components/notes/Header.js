import React from "react";
import { AddNote } from "./AddNote";
import { EditNote } from "./EditNote";

export const Header = ({
  showNoteForm,
  setShowNoteForm,
  noteToEdit,
  onEditNote,
}) => {
  return (
    <div>
      <div className="headerSection">Notes</div>
      <button
        className="btn btn-primary"
        onClick={() =>
          setShowNoteForm({ show: !showNoteForm.show, mode: "add" })
        }
      >
        {"Add Note"}
      </button>

      {showNoteForm.mode === "add" ? (
        <AddNote show={showNoteForm.show} setShowNoteForm={setShowNoteForm} />
      ) : (
        <EditNote
          onEditNote={onEditNote}
          noteToEdit={noteToEdit}
          show={showNoteForm.show}
          setShowNoteForm={setShowNoteForm}
        />
      )}
    </div>
  );
};
