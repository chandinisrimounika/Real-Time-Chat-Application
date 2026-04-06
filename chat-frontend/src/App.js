import { useState } from "react";
import Chat from "./components/Chat";
import Join from "./components/Join";

function App() {
  const [name, setName] = useState("");

  return (
    <>
      {name ? (
        <Chat name={name} />
      ) : (
        <Join setName={setName} />
      )}
    </>
  );
}

export default App;