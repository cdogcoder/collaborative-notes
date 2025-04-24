"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";


export default function SignUpPage() {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const router = useRouter();
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const usersCollectionRef = collection(db, "users");


  const signUpNewUser = async (event) => {

    event.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        newUserEmail,
        newUserPassword
      );

      await addDoc(usersCollectionRef, {
        accessToken: response.user.accessToken,
        displayName: response.user.displayName,
        email: response.user.email,
        emailVerified: response.user.emailVerified,
        isAnonymous: response.user.isAnonymous,
        phoneNumber: response.user.phoneNumber,
        photoURL: response.user.photoURL,
        userId: response.user.uid
      });

    } catch (error) {
      console.log(error);
    } finally {
      router.push("/")
    }
  };

  return (
    <div className="body form">
      <form className="sign-up-form">
        <p className="form-title">Sign Up</p>
        <div className="form-inputs">
          <input
            className="email-input"
            type="email"
            placeholder="Email"
            onKeyUp={(event) => setNewUserEmail(event.target.value)}
          ></input>
          <input
            className="password-input"
            type="password"
            placeholder="Password"
            onKeyUp={(event) => setNewUserPassword(event.target.value)}
          ></input>
          <input
            className="form-submit-button"
            type="submit"
            value={"Create User"}
            onClick={(event) => signUpNewUser(event)}
          ></input>
        </div>
      </form>
    </div>
  );
}
