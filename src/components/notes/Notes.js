import React, { useState, useEffect } from "react";
import { NotesList } from "./NotesList";

import { useSelector, useDispatch } from "react-redux";
import { creatorAsyncGetNotes } from "../../redux/slice/noteSlice";
import { creatorAsyncGetCategories } from "../../redux/slice/categorySlice";
import { Header } from "./Header";

export const Notes = () => {
  const [showForm, setShowForm] = useState({ show: false, mode: "Add" });
  const [notes, setnotes] = useState({});
  const [noteToEdit, setNoteToEdit] = useState(undefined);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.notes);
  const { categoriesList } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(creatorAsyncGetNotes());
    dispatch(creatorAsyncGetCategories());
  }, [dispatch]);

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    setShowForm({ show: !showForm.show, mode: "Edit" });
  };

  const handleAddNote = (note) => {
    setnotes([...notes, note]);
  };

  const handleDeleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setnotes(newNotes);
  };

  const handleEditNote = (note) => {
    const newNotes = notes.map((x) => (x.id === note.id ? note : x));
    setnotes(newNotes);
  };

  return (
    <div style={{ marginLeft: "0.3rem" }}>
      <Header
        showNoteForm={showForm}
        setShowNoteForm={setShowForm}
        onAddNote={handleAddNote}
        onEditNote={handleEditNote}
        noteToEdit={noteToEdit}
      />
      <NotesList
        noteList={list}
        categoryList={categoriesList}
        onDelete={handleDeleteNote}
        onEdit={handleEditClick}
      />
    </div>
  );
};
