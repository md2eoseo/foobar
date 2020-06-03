import React from "react";

export default function Order(props) {
  return (
    <div className={props.nextOrder ? "Order nextOrder" : "Order"}>
      {props.order.id}
    </div>
  );
}
