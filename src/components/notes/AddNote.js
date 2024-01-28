import React from "react";
import { NoteForm } from "./NoteForm";

export const AddNote = ({ show, setShowNoteForm }) => {
  return (
    <NoteForm type="add" openModal={show} setShowNoteForm={setShowNoteForm} />
  );
};
