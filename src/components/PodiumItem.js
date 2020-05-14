import React from "react";
import podium_beer_img from "../images/podium_beer.png";

export default function PodiumItem(props) {
  const PodiumItem_style = {
    width: "30%",
    margin: "0 auto",
    padding: "5px 10px",
  };

  const podium_beer_img_style = {
    width: "90%",
  };

  return (
    <div className="PodiumItem" style={PodiumItem_style}>
      <img
        src={podium_beer_img}
        alt="podium_beer"
        style={podium_beer_img_style}
      />
      <div>
        {props.number}
        {props.beer}
      </div>
    </div>
  );
}
