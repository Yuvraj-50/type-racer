import React from "react";
import "../css/header.css";

function Header({ toggle }) {
  function handleToggle() {
    toggle(true);
  }
  return (
    <header className="container margin">
      <nav className="navbar">
        <a href="./" className="logo">
          Monkey type
        </a>
        <span onClick={handleToggle} className="profile">
          <span className="material-symbols-outlined">person</span> Profile
        </span>
      </nav>
    </header>
  );
}

export default Header;
