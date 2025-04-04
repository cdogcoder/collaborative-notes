"use client";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useState } from "react";

export default function Home() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentPageText, setDocumentPageText] = useState("");

  return (
    <div className="body">
      <input
        className="document-title"
        type="text"
        onKeyUp={(event) => console.log(event.target.value)}
      />
      <textarea
        className="document-page"
        onKeyUp={(event) => console.log(event.target.value)}
      ></textarea>
    </div>
  );
}
