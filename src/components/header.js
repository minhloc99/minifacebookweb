import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { auth } from "../services/db";

export default function Header(props) {
  return (
    <header>
      <nav>
        <div>
          <ul>
            {auth().currentUser ? (
              <React.Fragment>
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
                <li>
                  <Link to="/test">Test</Link>
                </li>
                <li onClick={() => auth().signOut()}>Logout</li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>Login</li>
                <li>Logout</li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
