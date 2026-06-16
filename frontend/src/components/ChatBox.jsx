import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ base URL
axios.defaults.baseURL = "http://localhost:5000";

const ChatBox = () => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");

    // Fetch messages
    const fetchMessages = async () => {
        try {
            const res = await axios.get("/api/messages");
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // Send message
    const sendMessage = async () => {
        if (!text.trim()) return;

        try {
            setError("");
            const res = await axios.post("/api/messages/send", { text });

            setMessages([res.data, ...messages]); // instant update
            setText("");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    // Delete message
    const deleteMessage = async (id) => {
        const confirmDelete = window.confirm("Delete this message?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/messages/${id}`);

            // instant UI update
            setMessages(messages.filter((msg) => msg._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Safe Chat 💬</h2>

            <div style={styles.inputContainer}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.sendBtn}>
                    Send
                </button>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.chatBox}>
                {messages.map((msg) => (
                    <div key={msg._id} style={styles.message}>
                        <span>{msg.text}</span>
                        <button
                            onClick={() => deleteMessage(msg._id)}
                            style={styles.deleteBtn}
                        >
                            ✖
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatBox;

// 🎨 Styles
const styles = {
    container: {
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        background: "#fff",
    },
    title: {
        textAlign: "center",
    },
    inputContainer: {
        display: "flex",
        gap: "10px",
        marginBottom: "15px",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    sendBtn: {
        padding: "10px",
        background: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
    },
    error: {
        color: "red",
    },
    chatBox: {
        maxHeight: "300px",
        overflowY: "auto",
    },
    message: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        marginBottom: "8px",
        background: "#f1f1f1",
        borderRadius: "8px",
    },
    deleteBtn: {
        background: "transparent",
        border: "none",
        color: "red",
        cursor: "pointer",
    },
};