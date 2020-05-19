import React from "react";
const images = require.context("../images/", true);

export default function ShowcaseItem(props) {
  const name_style = {};
  const img_style = {
    width: "30%",
  };
  const price_style = {};
  const desc_style = {};

  return (
    <>
      <h1 style={name_style}>{props.name}</h1>
      {/* every react state starts from 'undefined' when it renders, so we cannot use functions and inner properties after state */}
      {/* https://react-cn.github.io/react/tips/if-else-in-JSX.html */}
      {props.name !== undefined ? (
        <img
          src={images(
            `./beers/${props.name.split(" ").join("").toLowerCase()}.png`
          )}
          alt="beer_img"
          style={img_style}
        />
      ) : (
        ""
      )}
      <h2>39,00kr</h2>
      {props.description !== undefined ? (
        <p>{props.description.overallImpression}</p>
      ) : (
        ""
      )}
    </>
  );
}
