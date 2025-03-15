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
      <textarea className="document" onKeyUp={() => {
        const textArea = document.querySelector('textarea');
        if (textArea !== null) setText(textArea.value);
      }} defaultValue={text}></textarea>
    </div>
  );
}
