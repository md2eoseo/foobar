import React from "react";
import beer_bottles from "../images/beer-bottles";

export default function Recommendation(props) {
  return (
    <div className="Recommendation">
      <h1>Today's Offer</h1>
      <img
        className="img"
        src={beer_bottles[props.rec.split(" ").join("").toLowerCase()]}
        alt="rec_img"
      />
      <h2 className="name">{props.rec}</h2>
    </div>
  );
}
