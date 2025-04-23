"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const [userSignedUp, setUserSignedUp] = useState(false);
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserSignedUp(true)
    }
  })

  return (
    <div className="body homepage">
      <nav className="header-nav">
        <span className="header-logo">Collaborative Notes</span>
        <button onClick={() => router.push("/sign-up")} className="sign-up-button">
          Sign Up
        </button>
        <button className="sign-in-button">Sign In</button>
      </nav>
      <div className="content-container">
        <h1 className="hero-text">Collaborative Notes</h1>
        <p className="description">Google Docs, with AI, only worse. Your one-stop-shop for literally nothing. {":)"}</p>
      </div>
      <div className="sign-up-status-message" hidden={!userSignedUp}>You've signed up! Please login with the credentials you used to create your account.</div>
    </div>
  );
}
