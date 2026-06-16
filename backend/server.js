const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", require("./routes/messageRoutes"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});