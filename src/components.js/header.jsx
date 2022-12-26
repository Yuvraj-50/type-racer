import { async } from "@firebase/util";
import React from "react";
import { UserAuth } from "../context/AuthContext";
import "../css/header.css";

function Header({ toggle }) {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  function handleToggle() {
    toggle(true);
  }
  return (
    <header className="container margin">
      <nav className="navbar">
        <a href="./" className="logo">
          Horse type
        </a>
        <div className="logout-button-wrapper">
          {user?.displayName ? (
            <button className="logout-btn" onClick={handleSignOut}>
              Log out
            </button>
          ) : (
            <button className="logout-btn"> Sign In</button>
          )}

          <span onClick={handleToggle} className="profile">
            <span className="material-symbols-outlined">person</span> Profile
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
