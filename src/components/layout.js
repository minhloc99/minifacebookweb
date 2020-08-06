import React from "react";
import Header from "./header";
import Footer from "./footer";
import "./layout.css";

export default function Layout(props) {
  return (
    <React.Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
}
