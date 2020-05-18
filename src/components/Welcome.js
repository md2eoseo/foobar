import React from "react";
import welcome_img from "../images/beers/elhefe.png";

export default function Welcome() {
  const Welcome_style = {
    width: "85%",
    margin: "2rem auto",
    padding: "5px 10px",
    display: "flex",
    justifyContent: "space-between",
    border: "3px solid black",
    borderRadius: "20px",
  };

  const greeting_text_style = {
    margin: "5px 10px",
    fontSize: "2rem",
  };

  const desc_style = {
    margin: "5px 10px",
    fontSize: "1.5rem",
  };

  const welcome_img_style = {
    width: "20%",
    maxHeight: "200px",
    borderRadius: "50%",
  };

  return (
    <div className="Welcome" style={Welcome_style}>
      <div className="greeting_text" style={greeting_text_style}>
        <div className="title">Welcome to Foo Bar!</div>
        <div className="desc" style={desc_style}>
          This is FooBar!
        </div>
      </div>
      <img src={welcome_img} alt="welcome" style={welcome_img_style} />
    </div>
  );
}
