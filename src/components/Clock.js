import React, { useState } from "react";
import useInterval from "../hooks/useInterval";

export default function Clock() {
  const [time, setTime] = useState("");
  let initialTime = true;

  function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    if (seconds === 0 || initialTime) {
      setTime(
        `${hours < 10 ? `0${hours}` : hours}${seconds % 2 === 0 ? ":" : " "}${
          minutes < 10 ? `0${minutes}` : minutes
        }`
      );
      initialTime = false;
    }
  }

  useInterval(getTime, 1000);

  return (
    <div className="Clock" style={{ fontSize: "2rem", fontWeight: "600" }}>
      {time}
    </div>
  );
}
