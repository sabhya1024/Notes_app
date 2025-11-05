import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNodes controller", error);
    res.status(500).json({ message: "internal server error" });
  }
  // res.status(200).send("You fetched the notes \n");
};

export const getSingleNote = async (req, res) => {
     try {
          const note = await  Note.findById(req.params.id)
          if (!note) res.status(404).json({ message: "not found" });

          res.status(200).json(note);
     } catch (error) {
          console.error("Error in getsingleNode controller", error);
          res.status(500).json({ message: "intteral server error" })
     }
}

export const createNewNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title: title, content: content });

    const savedNote = await note.save();
    res.status(201).json({
      message: "Note created successfully",
      note: savedNote,
    });
  } catch (error) {
    console.error("Error in create node controller", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updateNote)
      return res.status(404).json({ message: "note not found " });
    res.status(200).json({ message: "note updated successfully" });
  } catch (error) {
    console.error("Error in update node controller", error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const deleteNote = async(req, res) => {
     try {
          // const { title, content } = req.body
          const nodeToDelete = await Note.findByIdAndDelete(req.params.id);
          if (!nodeToDelete) return res.status(404).json({ message: "note mot found" });

          res.status(200).json({ message: "Note deleted successfully." });


  } catch (error) {
    console.error("Error in delete node controller", error);
    res.status(500).json({ message: "internal server error" });
  }
};
