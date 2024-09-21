import {
  faCirclePlus,
  faPaintBrush,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Preview from "./Preview";
import Message from "./Message";
import NotesContainer from "./Notes/NotesContainer";
import NotesList from "./Notes/NotesList";
import Note from "./Notes/Note";
import NoteForm from "./Notes/NoteForm";
import Alert from "./Alert";
import "../index.css";

export default function Main() {
  // The States OF The App
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [valitionError, setValitionError] = useState([]);

  // When The App Starts
  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
    } else {
      localStorage.setItem("notes", JSON.stringify([]));
    }
  }, []);

  // To Disapprear The ALert List
  useEffect(() => {
    if (valitionError.length !== 0) {
      setTimeout(() => {
        setValitionError([]);
      }, 4000);
    }
  }, [valitionError]);

  function saveToLocalStorage(key = "notes", value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  // To Check Form Inputs
  function validate() {
    let validationErrors = [];
    let passed = true;

    if (!title) {
      validationErrors.push("الرجاء إدخال عنوان الملاحضة");
      passed = false;
    }

    if (!content) {
      validationErrors.push("الرجاء إدخال محتوى الملاحضة");
      passed = false;
    }

    setValitionError(validationErrors);

    return passed;
  }

  // Save a Note
  const saveNoteHandler = () => {
    if (!validate()) return;

    // const note = {
    //   id: new Date(),
    //   title: title,
    //   content: content,
    // };

    const note = new Map([
      ["id", new Date()],
      ["title", title],
      ["content", content],
    ]);

    const updatedNotes = [...notes, note];

    saveToLocalStorage(updatedNotes);
    setNotes(updatedNotes);
    setCreating(false);
    setSelectedNote(note.id);
    setTitle("");
    setContent("");
  };

  // Remove a Note
  const removeNoteHandler = () => {
    const updatedNotes = notes.filter((note) => note.id !== selectedNote);
    setNotes(updatedNotes);
    saveToLocalStorage(updatedNotes);
    setSelectedNote(null);
    setCreating(false);
    setEditing(false);
  };

  // Update a Note

  const updateNoteHandler = () => {
    if (!validate()) return;

    const updatedNotes = [...notes];
    const noteIndex = notes.findIndex((note) => note.id === selectedNote);

    updatedNotes[noteIndex] = {
      id: selectedNote,
      title: title,
      content: content,
    };

    saveToLocalStorage(updatedNotes);
    setNotes(updatedNotes);
    setEditing(false);
    setTitle("");
    setContent("");
  };

  // Show Add a Note List
  const addNoteScreen = () => {
    return (
      <NoteForm
        formTitle={"إضافة ملاحضة جديدة"}
        title={title}
        content={content}
        titleChanged={titleChangeHandler}
        contentChanged={contentChangeHandler}
        submitText={"حفظ"}
        submitClick={saveNoteHandler}
      />
    );
  };

  // Show a Note
  const perviewScreen = () => {
    if (notes.length === 0) {
      return <Message title={"لا يوجد ملاحضات"} />;
    }

    if (!selectedNote) {
      return <Message title={"الرجاء إختيار ملاحضة"} />;
    }

    const note = notes.find((note) => {
      return note.id === selectedNote;
    });

    let noteDisplay = (
      <div className="text-[#E6D5B8] w-4/5" style={{ lineBreak: "anywhere" }}>
        <h2 className={`text-2xl `}> {note.title} </h2>
        <p className={`mt-5 mr-3`}>* {note.content}</p>
      </div>
    );

    if (editing) {
      noteDisplay = (
        <NoteForm
          formTitle={"تعديل ملاحضة"}
          title={title}
          content={content}
          titleChanged={titleChangeHandler}
          contentChanged={contentChangeHandler}
          submitClick={updateNoteHandler}
          submitText={"تعديل"}
        />
      );
    }

    return (
      <div className={`py-6 px-12 flex justify-between w-full`}>
        {noteDisplay}

        {!editing && (
          <div className={`text-2xl text-[#F0A500]`}>
            <a href="#">
              <FontAwesomeIcon
                icon={faPaintBrush}
                className={`hover:text-[#E6D5B8] transition-all`}
                onClick={editNoteHandler}
              />
            </a>
            <a href="#" className="mr-5">
              <FontAwesomeIcon
                icon={faTrashCan}
                className={`hover:text-red-700 transition-all`}
                onClick={removeNoteHandler}
              />
            </a>
          </div>
        )}
      </div>
    );
  };

  // Move To Update a Note Mode
  const editNoteHandler = () => {
    const note = notes.find((note) => note.id === selectedNote);
    setEditing(true);
    setTitle(note.title);
    setContent(note.content);
  };

  // Move To add a Note Interfac
  const addNoteHandler = () => {
    setCreating(true);
    setEditing(false);
    setTitle("");
    setContent("");
  };

  const selectedNoteHandler = (noteId) => {
    setSelectedNote(noteId);
    setEditing(false);
    setCreating(false);
  };

  return (
    <div
      className={
        "flex bg-[#1B1A17] min-h-[470px] shadow-sm mb-10 rounded relative"
      }
    >
      <NotesContainer>
        <NotesList>
          {notes.map((note) => (
            <Note
              key={note.id}
              title={note.title}
              noteClick={() => {
                selectedNoteHandler(note.id);
              }}
              active={note.id === selectedNote}
            />
          ))}
        </NotesList>
        <button
          className={`
          add-btn
          absolute 
          top-1/2 
          -translate-y-1/2 
          w-[50px] 
          h-[50px] 
          left-[-25px] 
          bg-[#E6D5B8] 
          rounded-full `}
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className={`w-full h-full text-[#F0A500]`}
            onClick={addNoteHandler}
          />
        </button>
      </NotesContainer>

      <Preview>{creating ? addNoteScreen() : perviewScreen()}</Preview>

      {valitionError.length !== 0 && (
        <Alert validationMessages={valitionError} />
      )}
    </div>
  );
}
