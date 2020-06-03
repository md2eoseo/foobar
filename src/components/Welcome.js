import React from "react";
import Clock from "./Clock";
import logo from "../images/logo.svg";

export default function Welcome() {
  return (
    <div className="Welcome">
      <img className="logo" src={logo} alt="logo" />
      <div className="text">Welcome to Foo Bar!</div>
      <Clock />
    </div>
  );
}
