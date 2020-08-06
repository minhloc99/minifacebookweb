import React, { useState, useEffect } from "react";
import { signin } from "../services/auth";
import { Link } from "react-router-dom";
import "./loginOrSignup.css";
import { ga } from "../services/db";

export default function Login(props) {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState({});

  useEffect(() => {
    ga.logEvent(`EventName : user visits Login Page`);
  }, []);

  function onClick() {
    signin(username, password).then(
      function (success) {
        console.log("success");
      },
      function (error) {
        setError(error);
      }
    );
  }

  return (
    <div id="login-form">
      <form>
        <div>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <p>{error.message}</p>
        <input type="button" value="Log in" onClick={onClick} />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
