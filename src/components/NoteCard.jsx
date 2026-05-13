import { Trash2Icon, PenSquareIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const date = new Date(note.createdAt);
  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevent navigation to the note detail page when delete button is clicked
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }
    // Implement delete functionality here
    try {
      const res = await api.delete(`/notes/${id}`);
      if (res.status === 200) {
        console.log(res.data);

        toast.success(res.data.message);
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    // <div className="hover-3d">
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h2 className="card-title text-base-content">{note.title}</h2>
        <p className="text-base-content">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(date)}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
