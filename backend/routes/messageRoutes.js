const express = require("express");
const router = express.Router();

const {
    sendMessage,
    getMessages,
    deleteMessage,
} = require("../controllers/messageController");

// Routes
router.post("/send", sendMessage);
router.get("/", getMessages);
router.delete("/:id", deleteMessage);

module.exports = router;