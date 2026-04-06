import React, { useEffect, useState } from "react";
import {
  getMessages,
  sendMessage,
  deleteMessage,
  pinMessage,
} from "../api/api";

function Chat({ name }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [hiddenMessages, setHiddenMessages] = useState([]);

  // ✅ FIXED: Error-safe fetch
  const fetchMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      await sendMessage(input);
      setInput("");
      fetchMessages();
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h3 style={{ margin: 0 }}>💬 Chat Room</h3>
          <small>{messages.length} messages</small>
        </div>

        <div style={styles.user}>🟢 {name}</div>
      </div>

      {/* PINNED */}
      <div style={styles.pinnedSection}>
        <h4>📌 Pinned Messages</h4>
        {messages
          .filter((msg) => msg.pinned && !msg.deletedForEveryone)
          .map((msg) => (
            <div key={msg.id} style={styles.pinnedMsg}>
              {msg.content}
            </div>
          ))}
      </div>

      {/* CHAT AREA */}
      <div style={styles.chatArea}>
        {messages
          .filter((msg) => !hiddenMessages.includes(msg.id))
          .map((msg) => (
            <div key={msg.id} style={styles.messageRight}>
              <div style={styles.bubble}>

                <div>
                  {msg.deletedForEveryone
                    ? "🚫 Message Deleted"
                    : msg.content}
                </div>

                <div style={styles.time}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>

                {/* ACTIONS */}
                <div style={styles.actions}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteMessage(msg.id, "everyone")}
                  >
                    Delete All
                  </button>

                  <button
                    style={styles.deleteMeBtn}
                    onClick={() =>
                      setHiddenMessages([...hiddenMessages, msg.id])
                    }
                  >
                    Delete Me
                  </button>

                  <button
                    style={styles.pinBtn}
                    onClick={() => pinMessage(msg.id)}
                  >
                    📌
                  </button>
                </div>

              </div>
            </div>
          ))}
      </div>

      {/* INPUT */}
      <div style={styles.inputBar}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />

        <button onClick={handleSend} style={styles.sendBtn}>
          ➤
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f1f5f9",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "white",
    borderBottom: "1px solid #ddd",
  },

  user: {
    background: "#e2e8f0",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  },

  pinnedSection: {
    background: "#fff8dc",
    padding: "10px",
  },

  pinnedMsg: {
    background: "#ffeaa7",
    padding: "6px",
    margin: "5px 0",
    borderRadius: "6px",
  },

  chatArea: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },

  messageRight: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },

  bubble: {
    background: "#14b8a6",
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    maxWidth: "260px",
  },

  time: {
    fontSize: "10px",
    marginTop: "5px",
    textAlign: "right",
    opacity: 0.8,
  },

  actions: {
    marginTop: "5px",
  },

  deleteBtn: {
    marginRight: "5px",
    background: "#ff7675",
    border: "none",
    padding: "4px 7px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },

  deleteMeBtn: {
    marginRight: "5px",
    background: "#fdcb6e",
    border: "none",
    padding: "4px 7px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  pinBtn: {
    background: "#6c5ce7",
    border: "none",
    padding: "4px 7px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },

  inputBar: {
    display: "flex",
    padding: "10px",
    background: "white",
    borderTop: "1px solid #ddd",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
  },

  sendBtn: {
    marginLeft: "10px",
    padding: "10px 15px",
    borderRadius: "50%",
    background: "#14b8a6",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default Chat;