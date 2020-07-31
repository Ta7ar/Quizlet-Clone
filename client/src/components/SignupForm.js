import React, { useState } from "react";
import Spinner from "./Spinner";
const axios = require("axios").default;

function SignupForm() {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmedPassword) {
      setLoading(false);
      return setMessage("Passwords do not match");
    }
    axios
      .post("/api/user/register", {
        name,
        password,
      })
      .then((res) => {
        setLoading(false);
        setMessage(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err.response.data);
      });
  };

  return (
    <div>
      <div className="form signup">
        <form>
          <label>
            Username:
            <br />
            <input
              placeholder="Minimum 3 Characters"
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
              placeholder="Minimum 6 Characters"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </label>
          <label>
            Confirm Password:
            <br />
            <input
              placeholder="Minimum 6 Characters"
              type="password"
              onChange={(e) => {
                setConfirmedPassword(e.target.value);
              }}
            ></input>
          </label>
          <div>
            <button onClick={registerUser}>Sign up</button>
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

export default SignupForm;
