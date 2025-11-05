import express from "express"
import mongoose from "mongoose"

const app = express();
const PORT = 30000;

app.get("/", (req, res) => {
    res.send(req.method)
})

connectDB.then(() => {
    app.listen(PORT, () => {
        console.log('server staerted at port ', PORT);
    })
})