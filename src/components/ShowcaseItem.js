import React from "react";
import beers from "../images/beers";

// https://reactjs.org/docs/forwarding-refs.html
const ShowcaseItem = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="ShowcaseItem">
      {/* every react state starts from 'undefined' when it renders, so we cannot use functions and inner properties after state */}
      {/* https://react-cn.github.io/react/tips/if-else-in-JSX.html */}
      {props.name !== undefined ? (
        <img
          className="img"
          src={beers[props.name.split(" ").join("").toLowerCase()]}
          alt="beer_img"
        />
      ) : (
        ""
      )}
      <h1 className="name">{props.name}</h1>
      <h2 className="price">{props.category} / 39,00kr</h2>
      {props.description !== undefined ? (
        <p className="desc">{props.description.overallImpression}</p>
      ) : (
        ""
      )}
    </div>
  );
});

export default ShowcaseItem;
