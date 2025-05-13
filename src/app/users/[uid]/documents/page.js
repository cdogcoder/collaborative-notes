"use client";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
export default function Home() {
  const params = useParams();
  const uid = params.uid;
  const [documents, setDocuments] = useState([]);
  const collectionRef = collection(db, `users/${uid}/documents`);
  const router = useRouter();

  const isAuthorized = async () => {
    const usersCollectionRef = collection(db, "/users");
    if (!auth.currentUser) {
      return <div></div>;
    } else {
      console.log(uid);
      const currentUserId = auth.currentUser.uid;
      const userDocs = await getDocs(usersCollectionRef);
      const userDocsInDB = userDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const currentUserDocId = userDocsInDB.find(
        (doc) => currentUserId == doc.userId
      ).id;
      console.log(currentUserDocId)
      if (currentUserDocId != uid) {
        return <div></div>;
      };
    }
  };


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
      chatHistory: [],
      messageIdentifiers: [],
      summarizeDocument: false,
      autoSaveTurnedOn: false,
    });
    router.push(`/users/${uid}/documents/${docRef.id}`);
  };

  const deleteDocument = async (id) => {
    const docRef = doc(db, `/users/${uid}/documents`, id);
    await deleteDoc(docRef);
    displayDocuments();
  };

  return (
    <>
      <div className="documents-buttons-container">
        <button
          className="add-new-document-button"
          onClick={() => addNewDocument()}
        >
          Add New Document
        </button>
        <button
          className="sign-out-button"
          onClick={() => {
            router.push("/");
            signOut(auth);
          }}
        >
          Sign Out
        </button>
      </div>
      <div className="documents-container">
        {documents.map((document) => {
          return (
            <div
              className="document"
              key={document.id}
              onClick={() =>
                router.push(`/users/${uid}/documents/${document.id}`)
              }
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
