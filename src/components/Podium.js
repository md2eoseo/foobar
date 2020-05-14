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
      <PodiumItem number="2" num="second" beer={podium.second} />
      <PodiumItem number="1" num="first" beer={podium.first} />
      <PodiumItem number="3" num="third" beer={podium.third} />
    </div>
  );
}
