import React, { useState, useEffect, useRef } from "react";
import ShowcaseItem from "./ShowcaseItem";
import useInterval from "../hooks/useInterval";

export default function Showcase(props) {
  const BEERS_NUM = props.data.length;
  const [idx, setIdx] = useState(0);
  const itemRef = useRef();

  useInterval(changeIdx, 2000);
  useEffect(showup, [idx]);

  function showup() {
    itemRef.current.classList.add("showup");
    // https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
    const timer = setTimeout(() => {
      itemRef.current.classList.remove("showup");
    }, 1000);
    return () => clearTimeout(timer);
  }
  function changeIdx() {
    setIdx((idx + 1) % BEERS_NUM);
  }

  const Showcase_style = { width: "30%" };

  return (
    <div className="Showcase" ref={itemRef} style={Showcase_style}>
      <ShowcaseItem {...props.data[idx]} />
    </div>
  );
}
