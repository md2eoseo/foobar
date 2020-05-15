import React from "react";

export default function Recommendation(props) {
  const Recommendation_style = {
    width: "35%",
    margin: "0 auto",
    padding: "5px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const beer_img = {
    width: "20%",
  };

  return (
    <div className="Recommendation" style={Recommendation_style}>
      <h2>Recommend for Now!!</h2>
      <img src={props.rec_img} alt="rec_img" style={beer_img} />
      <div>{props.rec}</div>
    </div>
  );
}
