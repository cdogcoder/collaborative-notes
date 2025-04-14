"use client";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
      <nav>
        <button
            onClick={() => redirect("/sign-up")}
        >Sign Up</button>
        <button>Sign In</button>
      </nav>
    </div>
  );
}
