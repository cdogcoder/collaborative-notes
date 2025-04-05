"use client";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { redirect, useParams } from "next/navigation";

export default function DocumentPage() {
  const params = useParams();
  const id = params.id;
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentText, setDocumentText] = useState("");

  const displayDocumentTitleAndText = async () => {
    const docRef = doc(db, "documents", id);
    const document = await getDoc(docRef);

    setDocumentTitle(document.data().documentTitle);
    setDocumentText(document.data().documentText);
  };

  useEffect(() => {
    displayDocumentTitleAndText();
  }, []);

  const saveDocument = async () => {
    const collectionRef = collection(db, "documents");
    const docRef = doc(db, "documents", id);

    if (docRef) {
      await updateDoc(docRef, {
        documentTitle: documentTitle,
        documentText: documentText,
      });
    } else {
      await addDoc(collectionRef, {
        documentTitle: documentTitle,
        documentText: documentText,
      });
    }
  };

  const exitDocumentPage = () => {
    redirect("/");
  }

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
        <button className="exit-document-page-button" onClick={() => exitDocumentPage()}>Exit</button>
      </div>
      <textarea
        className="document-page"
        onKeyUp={(event) => setDocumentText(event.target.value)}
        defaultValue={documentText}
      ></textarea>
    </div>
  );
}
