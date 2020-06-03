import React from "react";
import PodiumItem from "./PodiumItem";

export default function Podium({ ...podium }) {
  return (
    <div className="Podium">
      <h1>Best Sellers</h1>
      <div className="items">
        <PodiumItem number="2" beer={podium.second} num={podium.second_num} />
        <PodiumItem number="1" beer={podium.first} num={podium.first_num} />
        <PodiumItem number="3" beer={podium.third} num={podium.third_num} />
      </div>
    </div>
  );
}
