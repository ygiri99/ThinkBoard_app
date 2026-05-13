import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import api from "../lib/axios.js";
import NoteCard from "../components/NoteCard.jsx";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <h1 className="text-3xl font-bold m-4 opacity-90">My Notes</h1>
      <div className="max-w-xxl mx-auto p-5 mt-6">
        {loading ? (
          <p className="text-center text-primary py-10">Loading notes...</p>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        ) : (
          <p>No notes available. Create a Note</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
