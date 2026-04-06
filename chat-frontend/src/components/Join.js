import { useState } from "react";

function Join({ setName }) {
  const [input, setInput] = useState("");

  const handleJoin = () => {
    if (!input.trim()) return;
    setName(input);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>💬 Welcome to Chat</h1>
        <p>Enter your name to start chatting</p>

        <input
          placeholder="Your display name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleJoin} style={styles.button}>
          Join Chat
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    textAlign: "center",
    background: "#1e293b",
    padding: "30px",
    borderRadius: "10px",
    color: "white",
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#14b8a6",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default Join;