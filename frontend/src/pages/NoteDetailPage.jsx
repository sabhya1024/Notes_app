import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error ", error);
        toast.error("failed to fetch the Note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin size-20" />
      </div>
    );
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title or content cant be empty")
      return;
    }
    setSaving(true);

    try {
      const response = await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("something wrong happended. try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the note ? ")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully .");
      navigate("/");
    } catch (error) {
      toast.error("Can't delte note. try again");
      console.log("error", error);
    }
  };


  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn flex items-center p-4 gap-2 ">
              <FaArrowLeftLong className="size-4 relative top-[1px]" />
              <span className="text-sm font-medium"> Back to All notes</span>
            </Link>

            <button
              className="btn btn-ghost text-error rounded-full"
              onClick={(e) => handleDelete(e, note._id)}>
              <MdDelete className="size-4"></MdDelete>
              <span>Delete Note</span>
            </button>
          </div>

          <div className="card bg-base-300">
            <div className="card-body">
                <div className="form-control mb-4 ">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>

                  <input
                    type="text"
                    placeholder="note title"
                    className="input input-bordered "
                    value={note.title}
                    onChange={(e) => {
                      setNote({...note, title: e.target.value})
                    }}></input>
                </div>

                <div className="form-control mb-4 ">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>

                  <textarea
                    type="text"
                    placeholder="enter your note"
                    className="textarea textarea-bordered  h-32 placeholder:mb-2"
                    value={note.content}
                    onChange={(e) => {
                      setNote({ ...note, content: e.target.value });
                    }}></textarea>
                </div>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary "
                    disabled={saving}
                    onClick={handleSave}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
