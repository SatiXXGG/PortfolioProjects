import { useEffect, useState, useRef } from "react";
import { Socket, io } from "socket.io-client";

function App() {
  const [id, setId] = useState("");
  const [text, setText] = useState("");
  const [partyId, setPartyId] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });

    socket.on("write", (text, party) => {
      if (party === id) {
        setText(text);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id]); // Dependencia de id para actualizar el socket cuando cambie

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => {
        setId(data.id);
        console.log(data);
      });
  }, []);

  const handleInputChange: React.ChangeEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    setText(target.value);
    if (socketRef.current && e.target) {
      socketRef.current.emit("write", target, id);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setId(partyId);
    console.log("party id set");
  };

  return (
    <main>
      <h1 className="text-4xl text-purple-600">{"Live text server"}</h1>
      <article className="w-full flex flex-col mx-auto mt-2">
        <p className="text-md">Share this id to your friends to write with him!</p>
        <p className="text-purple-600 ">
          {id}
          <button
            className="ml-2 px-2 py-1 bg-purple-500 text-white text-md rounded-md"
            onClick={() => navigator.clipboard.writeText(id)}
          >
            Copy
          </button>
        </p>
      </article>
      <p className="text-md mt-2">Or try connecting to his id!</p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row justify-center mt-2"
      >
        <input
          className="bg-neutral-200 rounded-md px-2 py-1"
          placeholder="Enter id"
          onChange={(e) => setPartyId(e.target.value)}
        ></input>
        <input
          type="submit"
          className="ml-2 px-2 py-1 bg-purple-500 text-white text-md rounded-md"
        ></input>
      </form>

      <article>
        <textarea
          value={text}
          onChange={handleInputChange}
          className="bg-neutral-200 outline-2 outline-neutral-300 w-[80vw] h-[80vh] mt-6 p-7 rounded-2xl"
        ></textarea>
      </article>
    </main>
  );
}

export default App;
