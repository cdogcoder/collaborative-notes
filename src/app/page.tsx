'use client';


import React, { useState, useEffect } from "react";
import SaveButton from "./components/save-button";

export default function Home() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
      const storedText = window.localStorage.getItem("myText");
      storedText !== null ? setText(JSON.parse(storedText)) : "";
  }, [])
  useEffect(() => {
      window.localStorage.setItem("myText", JSON.stringify(text));
  }, [text]);

  return (
    <div className="body">
      <input 
        type="text" 
        className="title-bar"
        onKeyUp={() => {
          const titleBar = document.querySelector('input[type="text"]');
          if (titleBar !== null) setTitle(titleBar.value);
        }}
        defaultValue={title}
      />
      <textarea 
        className="document" 
        onKeyUp={() => {
          const textArea = document.querySelector('textarea');
          if (textArea !== null) setText(textArea.value);
        }} 
        defaultValue={text}
      >
      </textarea>
      <SaveButton documentText={text} documentTitle={title}></SaveButton>
    </div>
  );
}
