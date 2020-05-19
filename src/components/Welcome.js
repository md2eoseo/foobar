import React from "react";
import Clock from "./Clock";
import logo from "../images/logo.svg";

export default function Welcome() {
  const Welcome_style = {
    position: "fixed",
    top: "0",
    width: "100%",
    maxHeight: "8%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid black",
    backgroundColor: "#ffbc3f",
  };

  const logo_style = {
    marginLeft: "30px",
    height: "5.5vh",
  };

  const greeting_text_style = {
    fontSize: "2rem",
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
