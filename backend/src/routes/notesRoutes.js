import express from "express";
import {
  createNewNote,
  deleteNote,
  getAllNotes,
  updateNote,
  getSingleNote
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.post("/", createNewNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
