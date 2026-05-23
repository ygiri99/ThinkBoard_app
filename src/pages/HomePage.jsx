import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import api from "../lib/axios.js";
import NoteCard from "../components/NoteCard.jsx";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6;
  let totalPages = Math.ceil(notes.length / notesPerPage);
  let displayedNotes = notes.slice(
    (currentPage - 1) * notesPerPage,
    currentPage * notesPerPage,
  );

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
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedNotes.map((note, index) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
            <div className="join absolute bottom-5 left-1/2 transform -translate-x-1/2">
              {currentPage > 1 && (
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  prev
                </button>
              )}
              {currentPage === totalPages && currentPage > 3 && (
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage - 3)}
                >
                  {currentPage - 3}
                </button>
              )}
              {currentPage > 2 && (
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage - 2)}
                >
                  {currentPage - 2}
                </button>
              )}
              {currentPage > 1 && (
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {currentPage - 1}
                </button>
              )}
              <button className="join-item btn btn-active">
                {currentPage}
              </button>
              {totalPages >= currentPage + 1 && (
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {currentPage + 1}
                </button>
              )}
              {totalPages >= currentPage + 2 && currentPage < 3 && (
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage + 2)}
                >
                  {currentPage + 2}
                </button>
              )}
              {currentPage === 1 && totalPages > 3 && (
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage + 3)}
                >
                  {currentPage + 3}
                </button>
              )}
              {totalPages > currentPage && (
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  next
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>No notes available. Create a Note</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
