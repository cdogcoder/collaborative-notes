"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";


export default function SignInPage() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();
  const [signInWithEmailAndPassword] =
    useSignInWithEmailAndPassword(auth);
  const usersCollectionRef = collection(db, "users");


  const signInUser = async (event) => {

    event.preventDefault();
    await signInWithEmailAndPassword(userEmail, userPassword)
    router.push("/documents")
  };

  return (
    <div className="body form">
      <form className="sign-up-form">
        <p className="form-title">Sign In</p>
        <div className="form-inputs">
          <input
            className="email-input"
            type="email"
            placeholder="Email"
            onKeyUp={(event) => setUserEmail(event.target.value)}
          ></input>
          <input
            className="password-input"
            type="password"
            placeholder="Password"
            onKeyUp={(event) => setUserPassword(event.target.value)}
          ></input>
          <input
            className="form-submit-button"
            type="submit"
            value={"Sign In"}
            onClick={(event) => signInUser(event)}
          ></input>
        </div>
      </form>
    </div>
  );
}
