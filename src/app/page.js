"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [documents, setDocuments] = useState([]);

  const displayDocuments = async () => {
    const collectionRef = collection(db, "documents");
    const documentsSnapshot = await getDocs(collectionRef);
    const documentsSaved = documentsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setDocuments(documentsSaved);
  };

  useEffect(() => {
    displayDocuments();
  }, []);

  return (
    <>
      <button className="add-new-document-button">Add New Document</button>
      <div className="documents-container">
        {documents.map((document) => {
          return (
            <Link className="document" href={`/${document.id}`} key={document.id}>
              {document.documentTitle}
            </Link>
          );
        })}
      </div>
    </>
    
  );
}
