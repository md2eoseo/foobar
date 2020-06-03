import React from "react";
import Order from "./Order";
import queue from "../images/queue.png";

const QUEUE_LIMIT = 5;

export default function Queue(props) {
  const queueOrderNum = props.queue.length;
  let isMoreThan = false;
  if (queueOrderNum > QUEUE_LIMIT) isMoreThan = true;

  return (
    <div className="Queue">
      <div className="label">
        <img src={queue} alt="queue" />
        <div>Queue</div>
      </div>
      {props.queue.map((order, idx) => {
        if (idx < QUEUE_LIMIT)
          return (
            <Order
              key={order.id}
              order={order}
              nextOrder={idx === 0 ? true : false}
            />
          );
      })}
      {isMoreThan ? <span className="isMoreThan">···</span> : ""}
    </div>
  );
}
