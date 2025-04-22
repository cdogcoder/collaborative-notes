"use client";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="body homepage">
      <nav className="header-nav">
        <span className="header-logo">Colloborative Notes</span>
        <button onClick={() => router.push("/sign-up")} className="sign-up-button">
          Sign Up
        </button>
        <button className="sign-in-button">Sign In</button>
      </nav>
      <div className="content-container">
        <h1 className="hero-text">Colloborative Notes</h1>
        <p>Google Docs, with AI, only worse. Your one-stop-shop for literally nothing. {":)"}</p>
      </div>
    </div>
  );
}
