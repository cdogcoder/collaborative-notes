'use client'
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./config/firebase";

export default function Home() {
  const saveDocument = async () => {
    const collectionRef = collection(db, 'documents');

    const docRef = await addDoc(collectionRef, {
      title: 'hi',
      content: 'hi2'
    })
  }

  return (
    <div>
      <button onClick={()=>saveDocument()}>Click me</button>
    </div>
  );
}
