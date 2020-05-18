import React from "react";
import podium_beer_img from "../images/podium_beer.png";

export default function PodiumItem(props) {
  const PodiumItem_style = {
    width: "30%",
    margin: "0 auto",
    padding: "5px 10px",
  };

  let podium_beer_img_style = {};
  if (props.number === "1") {
    podium_beer_img_style = { ...podium_beer_img_style, width: "80%" };
  } else if (props.number === "2") {
    podium_beer_img_style = { ...podium_beer_img_style, width: "70%" };
  } else if (props.number === "3") {
    podium_beer_img_style = { ...podium_beer_img_style, width: "60%" };
  }

  return (
    <div className="PodiumItem" style={PodiumItem_style}>
      <div>{props.number}</div>
      <img
        src={podium_beer_img}
        alt="podium_beer"
        style={podium_beer_img_style}
      />
      <div>
        {props.beer}
        {/* {props.beerNum} */}
      </div>
    </div>
  );
}
