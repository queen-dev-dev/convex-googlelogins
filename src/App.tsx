import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";


let nameSet : boolean = false;
// For demo purposes. In a real app, you'd have real user data.
let NAME = "";
while (nameSet === false) {
  console.log("NO NAME SET")
  GetName();
}
export default function App() {
  const messages = useQuery(api.chat.getMessages);
  // TODO: Add mutation hook here.
  const sendMessage = useMutation(api.chat.sendMessage);

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);

  return (
    <main className="chat">
      <header>
        <h1>Convex Chat</h1>
        <p>
          Connected as <strong>{NAME}</strong>
        </p>
      </header>
      {messages?.map((message) => (
        <article
          key={message._id}
          className={message.user === NAME ? "message-mine" : ""}
        >
          <div>{message.user}</div>

          <p>{message.body}</p>
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ user: NAME, body: newMessageText });
          setNewMessageText("");
        }}
      >
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          placeholder="Write a message…"
          autoFocus
        />
        <button type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form>
    </main>
  );
}

function GetName(){
  let nameGiven = prompt("Set a name first")
  if (nameGiven != null){
    if (nameGiven != "") {
      nameSet = true;
      NAME = nameGiven;
    }
  }
  else{
    alert("No name given. You cannot chat until you give a name.")
  }
}
