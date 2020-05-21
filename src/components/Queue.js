import React from "react";
import Order from "./Order";

const QUEUE_LIMIT = 6;

export default function Queue(props) {
  const Queue_style = {
    padding: "0 10vw",
    width: "100%",
    height: "20%",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: "0",
    left: "auto",
    right: "auto",
    borderTop: "2px solid black",
  };

  const label_style = {
    display: "flex",
    alignItems: "center",
    margin: "0 1.5rem",
    padding: "5px 15px",
    position: "absolute",
    top: "-20px",
    left: "0",
    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "10px",
    fontSize: "1.8rem",
    fontWeight: "600",
  };

  const queueOrderNum = props.queue.length;
  let isMoreThan;
  if (queueOrderNum > QUEUE_LIMIT) {
    isMoreThan = <span>···</span>;
  }

  return (
    <div className="Queue" style={Queue_style}>
      <div style={label_style}>Queue</div>
      {props.queue.map((order, idx) => {
        if (idx < QUEUE_LIMIT) {
          return <Order key={order.id} order={order} />;
        }
      })}
      {isMoreThan}
    </div>
  );
}
