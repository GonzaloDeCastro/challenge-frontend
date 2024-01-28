import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriesList: [],
  isLoading: false,
  error: "",
};

export const note = createSlice({
  name: "categories",
  initialState,
  reducers: {
    creatorGetCategories: (state, action) => {
      return {
        ...state,
        categoriesList: action.payload,
      };
    },
  },
});

export const { creatorGetCategories } = note.actions;

export const creatorAsyncGetCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        /* `${process.env.REACT_APP_BACKEND_URL_PORT}/categories/all` */

        "https://ensolvers-backend.vercel.app/categories/all"
      );

      if (response.status === 200) {
        const action = creatorGetCategories(response.data);

        dispatch(action);
      }
    } catch (error) {}
  };
};

export default note.reducer;
