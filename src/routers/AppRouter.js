// AppRouter.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Notes } from "../components/notes/Notes";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
      </Routes>
    </Router>
  );
};
