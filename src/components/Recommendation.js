import React from "react";

export default function Recommendation(props) {
  const Recommendation_style = {
    width: "30%",
    margin: "0 auto",
    padding: "5px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "",
    alignItems: "center",
  };

  const beer_img = {
    width: "20%",
  };

  return (
    <div className="Recommendation" style={Recommendation_style}>
      <h1>Today's Offer</h1>
      <img src={props.rec_img} alt="rec_img" style={beer_img} />
      <div
        style={{
          maxHeight: "1rem",
          overflow: "visible",
          fontSize: "1.5rem",
        }}
      >
        {props.rec}
      </div>
    </div>
  );
}
