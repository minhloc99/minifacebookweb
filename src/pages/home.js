import React, { useEffect } from "react";
import Layout from "../components/layout";
import { Link } from "react-router-dom";
import "./home.css";
import { ga } from "../services/db";

export default function Home(props) {
  useEffect(() => {
    ga.logEvent(`EventName : user visits Home Page`);
  }, []);

  return (
    <Layout>
      <p>This is a great place to share your thoughts</p>
      <Link to="/signup">Create New Account</Link>
      <Link to="/login">Login to Your Account</Link>
    </Layout>
  );
}
