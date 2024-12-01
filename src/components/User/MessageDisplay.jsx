import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CmessageDisplay() {
  const params = useParams();
  const [allMessages, setAllMessages] = React.useState("");
  React.useEffect(() => {
    axios
      .get(
        `http://localhost:5500/home/${params.userId}/tasks/${params.fUser}/messages`
      )
      .then((res) => res)
      .then((data) => setAllMessages(data.data));
  });
  return (
    <div className="CmessageDisplay">
      <h2>messages goes here</h2>
      {allMessages?.allMessages?.map((item) => (
        <div
          className={item.userId === params.userId ? "clientMsg" : "lancerMsg"}
        >
          <span
          // style={{
          //   color: "whitesmoke",
          //   backgroundColor: "black",
          //   width: "8rem",
          //   margin: "1rem",
          //   borderRadius: "6px",
          //   display: "block",
          // }}
          >
            {item.msgContent}
          </span>
        </div>
      ))}
    </div>
  );
}
