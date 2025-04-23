"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  
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
    </div>
  );
}
