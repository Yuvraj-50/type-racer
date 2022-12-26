import React from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../css/signIn.css";
function SignInPage() {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="sign-page">
      <div className="sign-card">
        <h1>Sign In</h1>
        <p>Welcome to Monkey Type</p>
        <GoogleButton className="googlebtn" onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
}

export default SignInPage;
