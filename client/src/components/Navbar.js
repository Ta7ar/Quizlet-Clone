import React from "react";
import { Link } from "react-router-dom";

function Navbar({ toggleTheme, isLoggedIn, toggleLoggedIn }) {
  const handleLogout = () => {
    //delete json webtoken from local storage
    localStorage.removeItem("auth-token");
    toggleLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div className="navbar">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/createdeck">
            Create Deck
          </Link>
        </div>
        <div>
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        </div>
        <div onClick={toggleTheme}>
          <i className="far fa-moon" />
        </div>
      </div>
    );
  }
  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        <Link to="/signup">Signup</Link>
      </div>

      <div>
        <Link to="/login">Login</Link>
      </div>

      <div onClick={toggleTheme}>
        <i className="far fa-moon" />
      </div>
    </div>
  );
}

export default Navbar;
