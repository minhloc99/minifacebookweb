import React, { useState } from "react";
import "./editor.css";

export default function Editor(props) {
  var [text, setText] = useState("");

  function onClick() {
    props.onAfterSetText({ text: text });
    setText("");
  }

  return (
    <React.Fragment>
      <div className="editor">
        <form>
          <textarea
            placeholder={props.placeholder}
            name="w3review"
            rows="4"
            cols="30"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input
            type="button"
            value="OK"
            onClick={onClick}
            disabled={text !== "" ? false : true}
          ></input>
        </form>
      </div>
    </React.Fragment>
  );
}
