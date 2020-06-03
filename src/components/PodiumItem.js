import React from "react";
import podium_beer_img from "../images/podium_beer.png";
import beers from "../images/beers";

export default function PodiumItem(props) {
  let podium_beer_number_style = { height: "18%", marginBottom: "0.5rem" };
  let podium_beer_img_style = { objectFit: "cover" };
  let podium_beer_logo_img_style = {
    borderRadius: "9999px",
    position: "absolute",
    top: "1.5rem",
    width: "40%",
  };
  if (props.number === "1") {
    podium_beer_number_style = {
      ...podium_beer_number_style,
      fontSize: "2rem",
      fontWeight: "700",
      color: "#FFBC3F",
    };
    podium_beer_img_style = { ...podium_beer_img_style, width: "80%" };
    podium_beer_logo_img_style = { ...podium_beer_logo_img_style };
  } else if (props.number === "2") {
    podium_beer_number_style = {
      ...podium_beer_number_style,
      fontSize: "1.8rem",
      fontWeight: "650",
      color: "#FFBC3F",
    };
    podium_beer_img_style = { ...podium_beer_img_style, width: "70%" };
    podium_beer_logo_img_style = {
      ...podium_beer_logo_img_style,
      width: "35%",
    };
  } else if (props.number === "3") {
    podium_beer_number_style = {
      ...podium_beer_number_style,
      fontSize: "1.6rem",
      fontWeight: "650",
      color: "#FFBC3F",
    };
    podium_beer_img_style = { ...podium_beer_img_style, width: "60%" };
    podium_beer_logo_img_style = {
      ...podium_beer_logo_img_style,
      width: "30%",
    };
  }

  return (
    <div className="PodiumItem">
      <div style={podium_beer_number_style}>{props.number}</div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <img
          src={podium_beer_img}
          alt="podium_beer"
          style={podium_beer_img_style}
        />
        <img
          src={beers[props.beer.split(" ").join("").toLowerCase()]}
          alt="podium_beer_logo"
          style={podium_beer_logo_img_style}
        />
      </div>
      <div className="beerName">{props.beer}</div>
    </div>
  );
}
