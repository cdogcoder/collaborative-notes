"use client";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { auth } from "../config/firebase";

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

  useEffect(() => {
    console.log(auth.currentUser)
  }, [])

  const addNewDocument = async () => {
    const docRef = await addDoc(collectionRef, {
      documentTitle: "",
      documentText: "",
      chatHistory: [],
      messageIdentifiers: [],
      summarizeDocument: false,
      autoSaveTurnedOn: false,
    });
    redirect(`/documents/${docRef.id}`);
  };

  const deleteDocument = async (id) => {
    const docRef = doc(db, "documents", id);
    await deleteDoc(docRef);
    displayDocuments();
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
            <div
              className="document"
              key={document.id}
              onClick={() => redirect(`/documents/${document.id}`)}
            >
              {document.documentTitle}
              <button
                className="delete-document-button"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteDocument(document.id);
                }}
              >
                Delete Document
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
