import React from "react";
import Order from "./Order";

const QUEUE_LIMIT = 6;

export default function Queue(props) {
  const queueOrderNum = props.queue.length;
  let isMoreThan;
  if (queueOrderNum > QUEUE_LIMIT) {
    isMoreThan = <span>···</span>;
  }

  return (
    <div className="Queue">
      <div className="label">Queue</div>
      {props.queue.map((order, idx) => {
        if (idx < QUEUE_LIMIT) {
          return <Order key={order.id} order={order} />;
        }
      })}
      {isMoreThan}
    </div>
  );
}
