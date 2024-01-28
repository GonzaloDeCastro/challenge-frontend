import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "../slice/noteSlice";
import categorySlice from "../slice/categorySlice";

export const store = configureStore({
  reducer: {
    notes: noteSlice,
    categories: categorySlice,
  },
});
