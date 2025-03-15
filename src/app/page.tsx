'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    const storedText = window.localStorage.getItem("myText");
    storedText !== null ? setText(JSON.parse(storedText)) : "";
  }, [])

  useEffect(() => {
    window.localStorage.setItem("myText", JSON.stringify(text));
  }, [text]);

  return (
    <div className="body">
      <textarea className="document" onKeyUp={(event) => {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
          setText(text + event.key)
        } else if (event.key == "Backspace") {
          setText(text.slice(0,text.length-1));
        };
        
      }} defaultValue={text}></textarea>
    </div>
  );
}
