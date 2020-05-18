import React from "react";

export default function Order(props) {
  const Order_style = {
    margin: "0 2rem",
    padding: "5px 10px",
    width: "10%",
    height: "8%",
    border: "2px solid black",
    textAlign: "center",
  };

  return (
    <div className="Order" style={Order_style}>
      {props.order.id}
    </div>
  );
}
