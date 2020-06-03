import React from "react";
import PodiumItem from "./PodiumItem";

export default function Podium({ ...podium }) {
  return (
    <div className="Podium">
      <h1>Top 3 Beers</h1>
      <div className="items">
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
