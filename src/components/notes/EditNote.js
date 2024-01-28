import React from "react";
import { NoteForm } from "./NoteForm";

export const EditNote = ({ noteToEdit, show, setShowNoteForm }) => {
  console.log("noteToEdit ", noteToEdit, "show ", show);
  return (
    <NoteForm
      type="edit"
      note={noteToEdit}
      openModal={show}
      setShowNoteForm={setShowNoteForm}
    />
  );
};
