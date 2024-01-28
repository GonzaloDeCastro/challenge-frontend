import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  list: [],
  isLoading: false,
  error: "",
};

export const note = createSlice({
  name: "notes",
  initialState,
  reducers: {
    creatorGetNotes: (state, action) => {
      return {
        ...state,
        list: action.payload,
      };
    },
    creatorAddNote: (state, action) => {
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    },
    creatorEditNote: (state, action) => {
      return {
        ...state,
        list: state.list.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    },
    creatorRemoveNote: (state, action) => {
      return {
        ...state,
        list: state.list.filter((note) => note.id !== action.payload),
      };
    },
  },
});

export const {
  creatorGetNotes,
  creatorAddNote,
  creatorEditNote,
  creatorRemoveNote,
} = note.actions;

export const creatorAsyncGetNotes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        /*  `${process.env.REACT_APP_BACKEND_URL_PORT}/notes/all` */
        `https://ensolvers-backend.vercel.app/notes/all`
      );

      if (response.status === 200) {
        const action = creatorGetNotes(response.data);

        dispatch(action);
      }
    } catch (error) {}
  };
};

export const creatorAsyncAddNote = (note) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        /* `${process.env.REACT_APP_BACKEND_URL_PORT}/notes/`, */
        "https://ensolvers-backend.vercel.app/notes/",
        note
      );
      if (response.status === 200) {
        const action = creatorAddNote(response.data);
        dispatch(action);
        Swal.fire({
          title: "Succes!",
          text: `Note ${note.title} added!`,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all fields",
        icon: "error",
      });
    }
  };
};

export const creatorAsyncEditNote = (note) => {
  console.log("que responde el note edit ", note);
  return async (dispatch) => {
    try {
      const response = await axios.put(
        /*    `${process.env.REACT_APP_BACKEND_URL_PORT}/notes/${note.id}`, */
        `https://ensolvers-backend.vercel.app/notes/${note.id}`,
        note
      );
      if (response.status === 200) {
        const action = creatorEditNote(response.data.note);
        console.log("que responde el action edit ", action);
        dispatch(action);
        Swal.fire({
          title: "Succes!",
          text: "Note modified!",
          icon: "success",
        });
      }
    } catch (error) {
      if (note.id === 1) {
        Swal.fire({
          title: "Info!",
          text: `This is a mockup, and cannot be modified!`,
          icon: "info",
        });
      }
    }
  };
};

export const creatorAsyncDeleteNote = (note) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        /*    `${process.env.REACT_APP_BACKEND_URL_PORT}/notes/${note.id}` */
        `https://ensolvers-backend.vercel.app/notes/${note.id}`
      );

      if (response.status === 200) {
        const action = creatorRemoveNote(note.id);
        dispatch(action);
        if (note.id === 1 || note.id === 2) {
          Swal.fire({
            title: "Info!",
            text: `${note.title} is a mockup, and cannot be deleted!`,
            icon: "info",
          });
        } else {
          Swal.fire({
            title: "Succes!",
            text: `${note.title} note has been deleted!`,
            icon: "success",
          });
        }
      }
    } catch (error) {}
  };
};

export default note.reducer;
