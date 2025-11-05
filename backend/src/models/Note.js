import mongoose from "mongoose";

// schema
// 2. model based of that schema


const noteSchema = new mongoose.Schema(
    {
      title :  {
            type: String,
            required: true,
            // unique: true,
        },
      content :  {
            type: String,
          required: true,
        }
      
    },
    {timestamps : true}
);

const Note = mongoose.model("Note", noteSchema)

export default Note