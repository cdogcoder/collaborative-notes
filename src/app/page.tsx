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
      <textarea className="document" onKeyUp={(event) => {setText(text+event.key)}} defaultValue={text}></textarea>
    </div>
  );
}
