const Message = require("../models/Message");
const Filter = require("bad-words");

const filter = new Filter();

// 🚫 Send message (BLOCK bad words)
exports.sendMessage = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({ message: "Message cannot be empty" });
        }

        if (filter.isProfane(text)) {
            return res.status(400).json({
                message: "Message contains inappropriate content ❌",
            });
        }

        const newMessage = await Message.create({ text });

        res.json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📥 Get messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🗑 Delete message
exports.deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Message.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json({ message: "Deleted successfully ✅" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};