// ForgotPasswordPage.jsx
import React, { useState } from "react";
import "./css/Forgot.css";
import axios from "axios";
import apiPath from "../path.js";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    alert
    try {
        localStorage.setItem("email",email)
        const res = await axios.post(`${apiPath()}/forgetuser`, {email});
        // console.log(res);
        setSubmitted(true);
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div className="forgot-wrapper">
      <section className="forgot-card">
        <h1 className="title">Forgot Password</h1>

        {submitted ? (
          <p className="success">
            If an account exists for <strong>{email}</strong>, a reset link is on
            its way. Check your inbox!
          </p>
        ) : (
          <>
            <p className="subtitle">
              Enter the email you used when you signed up and we’ll send you a
              link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="forgot-btn" type="submit">Send Reset Link</button>
            </form>
          </>
        )}

        <a href="/login" className="back-link">
          &larr; Back to sign-in
        </a>
      </section>
    </div>
  );
}
