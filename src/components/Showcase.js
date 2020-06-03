import React, { useState, useEffect, useRef } from "react";
import ShowcaseItem from "./ShowcaseItem";
import useInterval from "../hooks/useInterval";

export default function Showcase(props) {
  const BEERS_NUM = props.data.length;
  const [idx, setIdx] = useState(0);
  const itemRef = useRef();

  useInterval(changeIdx, 10000);
  useEffect(showup, [idx]);

  function showup() {
    itemRef.current.classList.add("showup");
    // setTimeout in React
    // https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
    const timer = setTimeout(() => {
      itemRef.current.classList.remove("showup");
    }, 8900);
    return () => clearTimeout(timer);
  }

  function changeIdx() {
    setIdx((idx + 1) % BEERS_NUM);
  }

  return (
    <div className="Showcase">
      <ShowcaseItem ref={itemRef} {...props.data[idx]} />
    </div>
  );
}
