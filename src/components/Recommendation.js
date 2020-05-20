import React from "react";

export default function Recommendation(props) {
  const Recommendation_style = {};

  const beer_img = {
    margin: "28px 0",
    maxHeight: "225px",
  };

  const beer_name = {
    maxHeight: "1rem",
    overflow: "visible",
    fontSize: "1.5rem",
  };

  return (
    <div className="Recommendation" style={Recommendation_style}>
      <h1>Today's Offer</h1>
      <img src={props.rec_img} alt="rec_img" style={beer_img} />
      <h2 style={beer_name}>{props.rec}</h2>
    </div>
  );
}
