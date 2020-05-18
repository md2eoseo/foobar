import React from "react";
import Clock from "./Clock";
import logo from "../images/logo.JPG";

export default function Welcome() {
  const Welcome_style = {
    position: "fixed",
    top: "0",
    width: "100%",
    maxHeight: "7%",
    padding: "5px 10px",
    display: "flex",
    justifyContent: "space-evenly",
    borderBottom: "2px solid black",
  };

  const greeting_text_style = {
    fontSize: "2rem",
  };

  const logo_style = {
    width: "10%",
  };

  return (
    <div className="Welcome" style={Welcome_style}>
      <img src={logo} alt="logo" style={logo_style} />
      <div className="greeting_text" style={greeting_text_style}>
        Welcome to Foo Bar!
      </div>
      <Clock />
    </div>
  );
}
