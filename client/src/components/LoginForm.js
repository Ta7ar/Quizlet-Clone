import React, { useState } from "react";
import Spinner from "./Spinner";
const axios = require("axios").default;

function LoginForm() {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/user/login", {
        name,
        password,
      })
      .then((res) => {
        setLoading(false);
        setMessage("Logged in");
        //store the jwt in res.data in local storage
        localStorage.setItem("auth-token", res.data);
        //redirect to home page
        window.location.href = "/";
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response.data);
      });
  };

  return (
    <div>
      <div className="form login">
        <form>
          <label>
            Username:
            <br />
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </label>

          <label>
            Password:
            <br />
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </label>
          <div>
            <button onClick={handleLogin}>Log in</button>
          </div>
        </form>
      </div>
      {message && (
        <p style={{ textAlign: "center", padding: "1rem" }}>{message}</p>
      )}
      {loading && <Spinner></Spinner>}
    </div>
  );
}

export default LoginForm;
