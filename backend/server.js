import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"

import notesRoutes from "./src/routes/notesRoutes.js";
import connectDB from "./src/config/db.js";
import ratelimiter from "./src/middleware/rateLimiter.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(ratelimiter);



app.use((req, res, next) => {
  console.log("we gota  new req");
  next();
});

app.use("/api/notes", notesRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/^/.*$/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("server started ", PORT);
  });
});
