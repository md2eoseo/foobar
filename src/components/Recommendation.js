import React from "react";

export default function Recommendation(props) {
  return (
    <div className="Recommendation">
      <h1>Today's Offer</h1>
      <img className="img" src={props.rec_img} alt="rec_img" />
      <h2 className="name">{props.rec}</h2>
    </div>
  );
}
