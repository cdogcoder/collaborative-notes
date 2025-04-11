"use client";
import { useState } from "react";

export default function SignUpPage() {
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

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
          ></input>
        </div>
      </form>
    </div>
  );
}
