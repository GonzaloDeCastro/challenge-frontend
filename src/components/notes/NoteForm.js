import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import {
  creatorAsyncAddNote,
  creatorAsyncEditNote,
} from "../../redux/slice/noteSlice";
import { creatorAsyncGetCategories } from "../../redux/slice/categorySlice";
export const NoteForm = ({ type, note, openModal, setShowNoteForm }) => {
  const dispatch = useDispatch();

  const { categoriesList } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(creatorAsyncGetCategories());
  }, [dispatch]);
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState("");
  const [archived, setArchive] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [send, setSend] = useState(false);

  const [category, setCategory] = useState(5);

  const handleCategoryChange = (event) => {
    setCategory(parseInt(event.target.value));
    console.log("eveny ", event.target.value);
  };

  const handleClose = () => {
    setShowModal(false);
    if (type === "add") {
      setShowNoteForm({ showModal: false, mode: "add" });
    } else {
      setShowNoteForm({ showModal: false, mode: "edit" });
    }
  };

  const sendForm = () => {
    setSend(true);
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);
  let newDate = `${year}-${month}-${day}`;
  newDate = newDate.toString();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (error === false) {
      if (type === "add") {
        const note = { title, content, archived, category };
        const action = creatorAsyncAddNote(note);
        dispatch(action);
      }
      if (type === "edit") {
        const payloadNote = {
          id: note.id,
          title,
          content,
          archived,
          newDate,
          category,
        };
        const action = creatorAsyncEditNote(payloadNote);
        console.log("payloadNote ", payloadNote);
        dispatch(action);
      }
      setTitle("");
      setContent("");

      handleClose();
    }
  };

  useEffect(() => {
    setTitle(note ? note.title : "");
    setContent(note ? note.content : "");
    setArchive(note ? note.archived === 1 : false);
    if (note && note.categoryId) {
      setCategory(note.categoryId);
    }
  }, [note]);

  useEffect(() => {
    if (openModal) {
      setShowModal(!showModal);
    }
  }, [openModal]);

  useEffect(() => {
    if (send) {
      if (title.length === 0) {
        setError("empty title");
      } else if (content.length === 0) {
        setError("empty content");
      } else if (category === "Select a category") {
        setError("empty category");
      } else {
        setError(false);
      }
    }
  }, [handleSubmit]);

  return (
    <>
      <Modal show={showModal} onHide={handleClose} className="modal__add__edit">
        <div className="modal-content">
          <Modal.Header closeButton>
            <Modal.Title>
              {type === "add" ? "Add Note" : "Edit Note"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="mt-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="form-control mb-3"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {error === "empty title" && (
                <p className="errors">Fill title field</p>
              )}
              <input
                type="text"
                name="content"
                placeholder="Content"
                className="form-control mb-3"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              {error === "empty content" && (
                <p className="errors">Fill content field</p>
              )}
              <div>
                <select
                  id="category"
                  placeholder="category"
                  value={category && category}
                  onChange={handleCategoryChange}
                >
                  {categoriesList.map((category) => (
                    <option key={category?.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
              {error === "empty category" && (
                <p className="errors">Select category</p>
              )}
              {type === "add" ? (
                ""
              ) : (
                <>
                  <div>
                    <label>
                      <input
                        style={{ marginRight: "10px" }}
                        type="checkbox"
                        name="archived"
                        checked={archived}
                        onChange={(e) => setArchive(e.target.checked)}
                      />
                      Archive
                    </label>
                  </div>
                </>
              )}

              <button
                className="btn-success"
                type="submit"
                onClick={sendForm}
                style={{ marginTop: "10px" }}
              >
                Confirm
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};
