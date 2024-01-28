import React, { useState } from "react";
import { NoteItem } from "./NoteItem";

export const NotesList = ({ noteList, onDelete, onEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [showArchived, setShowArchived] = useState(true);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const mockNotes = [
    {
      id: 1,
      title: "Mock Note 1",
      content: "This is a mock note content.",
      created_at: "2024-01-28",
      category: "No category",
      archived: 0,
    },
    {
      id: 2,
      title: "Mock Note 2",
      content: "This is another mock note content.",
      created_at: "2024-01-27",
      category: "No category",
      archived: 1,
    },
    // Puedes agregar más datos de mockup aquí
  ];

  // Fusionar datos reales y de mockup para la lista de notas
  const mergedNotes = [...noteList, ...mockNotes];

  const filteredNotes = mergedNotes.filter((note) => {
    const noteData =
      `${note.title} ${note.content} ${note.category}`.toLowerCase();
    return noteData.includes(searchText.toLowerCase());
  });

  const filteredAndActiveNotes = showArchived
    ? filteredNotes.filter((note) => !note.archived)
    : filteredNotes.filter((note) => note.archived);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <input
            style={{ marginTop: "10px" }}
            className="input-search"
            type="text"
            onChange={handleSearch}
            value={searchText}
            placeholder="Search note"
          />
          <button
            className="btn btn-danger"
            style={{
              marginLeft: "10px",
              border: showArchived ? "solid 2px" : "none",
            }}
            onClick={() => setShowArchived(true)}
          >
            {"Show active"}
          </button>
          <button
            className="btn btn-active"
            style={{
              marginLeft: "10px",
              border: showArchived ? "none" : "solid 2px",
            }}
            onClick={() => setShowArchived(false)}
          >
            {"Show archived"}
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px 40px 0px 40px",
            borderRadius: "5px",
            backgroundImage: "linear-gradient(to bottom, #333333, #666666)",
          }}
        >
          <label style={{ color: "white" }}>
            {showArchived ? "Actives" : "Archived"}
          </label>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="headerTable">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "90%",
            }}
          >
            <div className="titleFieldNote">Note</div>
            <div className="titleFieldNote">Content</div>
            <div className="titleFieldNote">Date</div>
            <div className="titleFieldNote">Category</div>
          </div>

          <div className="optionItem">Options</div>
        </div>
        {filteredAndActiveNotes.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundImage: "linear-gradient(to bottom, #dcffc2, #e1f0dd)",
              paddingBottom: "10px",
            }}
          >
            {"There are no notes matching the search criteria"}
          </div>
        ) : (
          <div className="bodyTable">
            {filteredAndActiveNotes.map((note) => (
              <NoteItem
                key={note.id}
                noteToShow={note}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
