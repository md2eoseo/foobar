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
      <div className="detail">
        <div className="name">{props.name}</div>
        <div className="category">{props.category}</div>
        <div className="price">Alc: {props.alc}% / 39,00kr</div>
        {props.description !== undefined ? (
          <p className="desc">{props.description.overallImpression}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
});

export default ShowcaseItem;
