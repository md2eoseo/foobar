import React, { useState } from "react";
import ShowcaseItem from "./ShowcaseItem";
import useInterval from "../hooks/useInterval";

export default function Showcase(props) {
  const BEERS_NUM = props.data.length;
  const [idx, setIdx] = useState(0);

  useInterval(changeIdx, 2000);

  function changeIdx() {
    setIdx((idx + 1) % BEERS_NUM);
  }

  return (
    <div className="Showcase">
      <ShowcaseItem {...props.data[idx]} />
    </div>
  );
}
