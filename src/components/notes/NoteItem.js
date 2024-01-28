import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { creatorAsyncDeleteNote } from "../../redux/slice/noteSlice";

export const NoteItem = ({ noteToShow, onEdit }) => {
  const dispatch = useDispatch();
  const Swal = require("sweetalert2");

  const handleDelete = () => {
    Swal.fire({
      title: "Wait!",
      text: `Are you sure you want to delete item ${noteToShow.title}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const action = creatorAsyncDeleteNote(noteToShow);
        dispatch(action);
      }
    });
  };

  return (
    <div className="rowTable">
      <div
        style={{
          width: "90%",
          display: "flex",
        }}
      >
        <div className="fieldNote">{noteToShow.title}</div>
        <div className="fieldNote">{noteToShow.content}</div>
        <div className="fieldNote">
          {noteToShow?.created_at?.toString().slice(0, 10)}
        </div>
        <div>
          {noteToShow?.category === 5 ? "No category" : noteToShow?.category}
        </div>
      </div>
      <div className="optionContainer">
        <EditIcon onClick={() => onEdit(noteToShow)} className="editIcon" />
        <DeleteIcon onClick={handleDelete} className="deleteIcon" />
      </div>
    </div>
  );
};
