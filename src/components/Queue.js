import React from "react";
import Order from "./Order";

const QUEUE_LIMIT = 5;

export default function Queue(props) {
  const Queue_style = {
    padding: "20px 0",
    width: "100%",
    display: "flex",
    position: "absolute",
    bottom: "0",
    left: "auto",
    right: "auto",
  };

  const queueOrderNum = props.queue.length;
  let isMoreThan;
  if (queueOrderNum > QUEUE_LIMIT) {
    isMoreThan = <span>···</span>;
  }

  return (
    <div className="Queue" style={Queue_style}>
      <div style={{ margin: "0 1.5rem" }}>Queue</div>
      {props.queue.map((order, idx) => {
        if (idx < QUEUE_LIMIT) {
          return <Order key={order.id} order={order} />;
        }
      })}
      {isMoreThan}
    </div>
  );
}
