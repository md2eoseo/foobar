import React from "react";
import PodiumItem from "./PodiumItem";

export default function Podium({ ...podium }) {
  const Podium_style = {
    textAlign: "center",
  };

  const items_style = {
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-around",
  };

  return (
    <div className="Podium" style={Podium_style}>
      <h1>Top 3 Beers</h1>
      <div className="podium_items" style={items_style}>
        <PodiumItem
          number="2"
          beer={podium.second}
          beerNum={podium.second_num}
        />
        <PodiumItem number="1" beer={podium.first} beerNum={podium.first_num} />
        <PodiumItem number="3" beer={podium.third} beerNum={podium.third_num} />
      </div>
    </div>
  );
}
