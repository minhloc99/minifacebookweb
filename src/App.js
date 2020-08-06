import React, { useState } from "react";
import "./App.css";
import Home from "./pages/home";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import { auth } from "./services/db";
import AllPosts from "./pages/allPosts";
import PostDetail from "./pages/postDetail";
import Test from "./pages/test";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/posts" />
        )
      }
    />
  );
}

function App() {
  var [loggedIn, setLoggedIn] = useState(false);

  auth().onAuthStateChanged((user) => {
    setLoggedIn(!!user);
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            exact
            path="/posts"
            authenticated={loggedIn}
            component={AllPosts}
          />
          <PrivateRoute
            exact
            path="/test"
            authenticated={loggedIn}
            component={Test}
          />
          <PrivateRoute
            path="/posts/:id"
            authenticated={loggedIn}
            component={PostDetail}
          />
          <PublicRoute
            path="/signup"
            authenticated={loggedIn}
            component={Signup}
          />
          <PublicRoute
            path="/login"
            authenticated={loggedIn}
            component={Login}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
