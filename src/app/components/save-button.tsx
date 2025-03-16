'use client'

import { db } from '../config/firebase';
import { addDoc, collection, doc } from 'firebase/firestore';

export default function SaveButton(props: any) {
    const saveDocument = async () => {
        const collectionRef = collection(db, 'documents');
        
        const docRef = await addDoc(collectionRef, {
            title: props.documentTitle,
            content: props.documentText,
        })
        console.log(docRef);

    }    
    return (<button className="save-button" onClick={() => saveDocument()}>Save Doc</button>);
}