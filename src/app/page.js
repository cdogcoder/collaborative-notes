"use client";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";

export default function Home() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentPageText, setDocumentPageText] = useState("");

  useEffect(() => {
    const storedTitle = window.localStorage.getItem("documentTitle");
    storedTitle !== null ? setDocumentTitle(JSON.parse(storedTitle)) : "";
    const storedText = window.localStorage.getItem("documentPageText");
    storedText !== null ? setDocumentPageText(JSON.parse(storedText)) : "";
  }, []);
  useEffect(() => {
    window.localStorage.setItem("documentTitle", JSON.stringify(documentTitle));
    window.localStorage.setItem(
      "documentPageText",
      JSON.stringify(documentPageText)
    );
  }, [documentPageText]);

  const saveDocument = async () => {
    const collectionRef = collection(db, "documents");

    const docRef = await addDoc(collectionRef, {
      documentTitle: documentTitle,
      documentText: documentPageText,
    });
  };

  return (
    <div className="body">
      <div className="navigation-bar">
        <input
          className="document-title"
          type="text"
          onKeyUp={(event) => setDocumentTitle(event.target.value)}
          defaultValue={documentTitle}
        />
        <button className="save-document-button" onClick={() => saveDocument()}>
          Save
        </button>
      </div>
      <textarea
        className="document-page"
        onKeyUp={(event) => setDocumentPageText(event.target.value)}
        defaultValue={documentPageText}
      ></textarea>
    </div>
  );
}
