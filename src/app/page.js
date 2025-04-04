"use client";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";

export default function Home() {
  const [documents, setDocuments] = useState([]);

  const displayDocuments = async () => {
    const collectionRef = collection(db, "documents");
    const documentsSnapshot = await getDocs(collectionRef);
    const documentsSaved = documentsSnapshot.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    }))
    setDocuments(documentsSaved);
  }

  useEffect(() => {
    displayDocuments()
  }, [])

  console.log(documents)
  return (
    <div className="documents-container">
      {documents.map((document) => {
        return <button key={document.id}>{document.title} {document.id}</button>
      })}
    </div>
  );
}
