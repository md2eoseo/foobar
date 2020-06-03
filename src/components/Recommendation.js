import React from "react";
import beer_bottles from "../images/beer-bottles";

export default function Recommendation(props) {
  return (
    <div className="Recommendation">
      <h1>Today's Offer</h1>
      <img
        className="img"
        // https://blog.bitsrc.io/understanding-react-default-props-5c50401ed37d
        src={
          beer_bottles[
            (props.rec.name || "default").split(" ").join("").toLowerCase()
          ]
        }
        alt="rec"
      />
      <div className="name">{props.rec.name}</div>
      <div className="category">{props.rec.category}</div>
      <div className="alc">Alc: {props.rec.alc}% / 39kr</div>
    </div>
  );
}
