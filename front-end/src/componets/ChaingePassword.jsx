// ResetPasswordSection.jsx
import React, { useState } from "react";
import "./css/ChaingePassword.css";
import axios from "axios";
import apiPath from "../path";

export default function ResetPasswordSection({ onReset = () => {} }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
        const email=localStorage.getItem("email")
        const res = await axios.post(`${apiPath()}/restpassword`, {password,email});
        console.log(res);
        
        onReset(password); 
        setSubmitted(true);
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div className="reset-wrapper">
      <section className="reset-card">
        {submitted ? (
          <>
            <h1 className="title">Password Updated</h1>
            <p className="success">
              Your password has been reset successfully. You can now&nbsp;
              <a href="/login">sign in</a>&nbsp;with your new credentials.
            </p>
          </>
        ) : (
          <>
            <h1 className="title">Reset Password</h1>
            <p className="subtitle">
              Create a strong password using at least 8 characters.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              {error && <p className="error">{error}</p>}
              <button type="submit">Save New Password</button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
