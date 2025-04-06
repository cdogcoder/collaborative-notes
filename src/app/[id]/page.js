"use client";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { redirect, useParams } from "next/navigation";

import ChatbotContainer from "../components/ChatbotContainer";

export default function DocumentPage() {
  const params = useParams();
  const id = params.id;
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentText, setDocumentText] = useState("");

  const [chatHistory, setChatHistory] = useState(() => {
    if (typeof window !== "undefined") {
      // const savedHistory = window.localStorage.getItem("chatHistory");
      // return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });
  useEffect(() => {
    // window.localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory])

  const [chatbotIsTyping, setChatbotIsTyping] = useState(false);
  const [userMessage, setUserMessage] = useState("");

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
  };

  const getChatbotResponse = async (updatedChatHistory) => {
    try {
      const response = await fetch("/summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedChatHistory),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      setChatbotIsTyping(true);
      const reader = response.body.getReader();
      const decoder = new TextDecoder("UTF-8");
      let done = false;
      let result = "";

      while (!done) {
        const chunk = await reader.read();
        done = chunk.done;
        result += decoder.decode(chunk.value, { stream: !done });
      }
      console.log("Chatbot response:", result);
      return result;
    } catch (error) {
      console.error("Error reading response:", error);
    } finally {
      setChatbotIsTyping(false);
    }
  };

  const sendMessage = () => {
    const newMessage = { role: "user", parts: [{ text: userMessage }] };
    const updatedChatHistory = [...chatHistory, newMessage];
    getChatbotResponse(updatedChatHistory).then((chatbotResponse) => {
      const chatbotMessage = {
        role: "model",
        parts: [{ text: chatbotResponse }],
      };
      setChatHistory([...updatedChatHistory, chatbotMessage]);
    });
    setUserMessage("");
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
        <button
          className="exit-document-page-button"
          onClick={() => exitDocumentPage()}
        >
          Exit
        </button>
      </div>
      <textarea
        className="document-page"
        onKeyUp={(event) => setDocumentText(event.target.value)}
        defaultValue={documentText}
      ></textarea>
      <div className="chatbot-summarizer">
        <ChatbotContainer messages={chatHistory} chatbotIsTyping={chatbotIsTyping}></ChatbotContainer>
        <div className="user-options">
          <input className="message-input" type="text" onChange={(event) => setUserMessage(event.target.value)}></input>
          <button className="send-message-button" onClick={(event) => sendMessage(event)}>Send</button>
        </div>
      </div>
    </div>
  );
}
