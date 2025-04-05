"use client";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const [documents, setDocuments] = useState([]);
  const collectionRef = collection(db, "documents");

  const displayDocuments = async () => {
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

  const addNewDocument = async () => {
    const docRef = await addDoc(collectionRef, {
      documentTitle: "",
      documentText: "",
    });
    redirect(`/${docRef.id}`);
  };

  return (
    <>
      <button
        className="add-new-document-button"
        onClick={() => addNewDocument()}
      >
        Add New Document
      </button>
      <div className="documents-container">
        {documents.map((document) => {
          return (
            <Link
              className="document"
              href={`/${document.id}`}
              key={document.id}
            >
              {document.documentTitle}
              <button className="delete-document-button">Delete Document</button>
            </Link>
          );
        })}
      </div>
    </>
  );
}
