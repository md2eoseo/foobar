import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Podium from "./components/Podium";
import Recommendation from "./components/Recommendation";
import Queue from "./components/Queue";

const DB_URL = "https://sojuapp.herokuapp.com/";
// https://stackoverflow.com/questions/54059179/what-is-require-context
const images = require.context("./images/", true);

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const [check, setCheck] = useState(false);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState({});
  const [podium, setPodium] = useState({
    first: "Nothing",
    second: "Nothing",
    third: "Nothing",
    first_num: 0,
    second_num: 0,
    third_num: 0,
  });
  const [rec, setRec] = useState("default");

  useInterval(get, 5000);

  function get() {
    fetch(DB_URL, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "x-apikey": API_KEY,
        // Request header field cache-control is not allowed by Access-Control-Allow-Headers in preflight response.
        // "cache-control": "no-cache",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else console.log("GET failed!");
      })
      .then((data) => {
        // update state here
        setSalesAndOrders(data);
        getRecommendation(data);
        return sales;
      })
      .then((sales) => {
        calculatePodium(sales);
      });
  }

  function getRecommendation(data) {
    let min_level = 2500;
    let min_beer = "";
    data.taps.forEach((tap) => {
      if (tap.level < min_level && tap.level !== 0) {
        min_level = tap.level;
        min_beer = tap.beer;
      }
    });
    setRec(min_beer);
    console.log(min_level, min_beer);
  }

  function setSalesAndOrders(data) {
    const new_orders = [...orders];
    const new_sales = { ...sales };
    // get new order from Serving data
    data.serving.forEach((new_order) => {
      let i = 0;
      for (i = 0; i < new_orders.length; i++) {
        if (new_order.id === new_orders[i].id) break;
      }
      if (i === new_orders.length) {
        new_orders.push(new_order);
        new_order.order.forEach((beer) => {
          if (new_sales[beer]) {
            new_sales[beer] += 1;
          } else {
            new_sales[beer] = 1;
          }
        });
      }
    });

    // get new order from Queue data
    data.queue.forEach((new_order) => {
      let i = 0;
      for (i = 0; i < new_orders.length; i++) {
        if (new_order.id === new_orders[i].id) break;
      }
      if (i === new_orders.length) {
        new_orders.push(new_order);
        new_order.order.forEach((beer) => {
          if (new_sales[beer]) {
            new_sales[beer] += 1;
          } else {
            new_sales[beer] = 1;
          }
        });
      }
    });

    setSales(new_sales);
    setOrders(new_orders);
  }

  function calculatePodium(sales) {
    const new_podium = {};
    let max = 0;
    let min = 9999;
    for (let cnt = 0; cnt < 3; cnt++) {
      for (let [beer, beerNum] of Object.entries(sales)) {
        if (max < beerNum && beerNum <= min) {
          if (new_podium.first !== beer && new_podium.second !== beer) {
            max = beerNum;
            if (cnt === 0) {
              new_podium.first = beer;
              new_podium.first_num = beerNum;
            } else if (cnt === 1 && new_podium.first !== beer) {
              new_podium.second = beer;
              new_podium.second_num = beerNum;
            } else if (cnt === 2 && new_podium.second !== beer) {
              new_podium.third = beer;
              new_podium.third_num = beerNum;
            }
          }
        }
      }
      min = max;
      max = 0;
    }
    setPodium(new_podium);
  }

  const beers_style = {
    display: "flex",
    justifyContent: "space-around",
  };

  return (
    <div className="App">
      <button onClick={() => setCheck(!check)}>{check ? "on" : "off"}</button>
      <Welcome />
      <div className="beers" style={beers_style}>
        <Podium {...podium} />
        <Recommendation
          rec={rec}
          rec_img={images(
            `./beers/${rec.split(" ").join("").toLowerCase()}.png`
          )}
        />
      </div>
      <Queue />
    </div>
  );
}

export default App;
