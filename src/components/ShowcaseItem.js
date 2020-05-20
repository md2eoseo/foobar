import React from "react";
const images = require.context("../images/", true);

// https://reactjs.org/docs/forwarding-refs.html
const ShowcaseItem = React.forwardRef((props, ref) => {
  const ShowcaseItem_style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const img_style = {
    maxHeight: "200px",
    marginTop: "10px",
  };
  const name_style = { marginTop: "12px" };
  const price_style = {};
  const desc_style = { maxWidth: "80%", marginTop: "8px" };

  return (
    <div ref={ref} className="ShowcaseItem" style={ShowcaseItem_style}>
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
      <h1 style={name_style}>{props.name}</h1>
      <h2 style={price_style}>{props.category} / 39,00kr</h2>
      {props.description !== undefined ? (
        <p style={desc_style}>{props.description.overallImpression}</p>
      ) : (
        ""
      )}
    </div>
  );
});

export default ShowcaseItem;
