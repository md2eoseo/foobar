import React from "react";
import PodiumItem from "./PodiumItem";

export default function Podium({ ...podium }) {
  const Podium_style = {
    width: "35%",
    margin: "0 auto",
    padding: "5px 10px",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div className="Podium" style={Podium_style}>
      <PodiumItem number="2" beer={podium.second} beerNum={podium.second_num} />
      <PodiumItem number="1" beer={podium.first} beerNum={podium.first_num} />
      <PodiumItem number="3" beer={podium.third} beerNum={podium.third_num} />
    </div>
  );
}
