import React from "react";

export default function Order(props) {
  const Order_style = {
    margin: "0 2rem",
    width: "10%",
    height: "55%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid black",
    borderRadius: "10px",
    fontSize: "1.5rem",
    fontWeight: "600",
  };

  return (
    <div className="Order" style={Order_style}>
      {props.order.id}
    </div>
  );
}
