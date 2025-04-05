"use client";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";

export default function Home() {
  const [documents, setDocuments] = useState([]);

  const displayDocuments = async () => {
    const collectionRef = collection(db, "documents");

    const docRef = await addDoc(collectionRef, {
      documentTitle: documentTitle,
      documentText: documentPageText,
    });
  };

  return (
    <div className="documents-container">
      {documents.map((document) => {
        return <button key={document.id}>{document.title} {document.id}</button>
      })}
    </div>
  );
}
