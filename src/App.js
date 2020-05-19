import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import useInterval from "./hooks/useInterval";
import Welcome from "./components/Welcome";
import Podium from "./components/Podium";
import Recommendation from "./components/Recommendation";
import Queue from "./components/Queue";

const DB_URL = "https://sojuapp.herokuapp.com/";
// https://stackoverflow.com/questions/54059179/what-is-require-context
const images = require.context("./images/", true);

function App() {
  // const [check, setCheck] = useState(false);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState({});
  const [podium, setPodium] = useState({
    first: "default",
    second: "default",
    third: "default",
    first_num: 0,
    second_num: 0,
    third_num: 0,
  });
  const [rec, setRec] = useState("default");
  const [queue, setQueue] = useState([]);

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
        setSalesOrdersPodium(data);
        getRecommendation(data);
      });
  }

  function getRecommendation(data) {
    let max_amount = 0;
    let max_beer = "";
    data.storage.forEach((beer) => {
      if (beer.amount > max_amount) {
        max_amount = beer.amount;
        max_beer = beer.name;
      }
    });
    setRec(max_beer);
    console.log(max_amount, max_beer);
  }

  function setSalesOrdersPodium(data) {
    const new_orders = [...orders];
    const new_sales = { ...sales };
    const new_podium = {};
    const new_queue = [];

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
      new_queue.push(new_order);

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

    let max = 0;
    let min = 9999;
    for (let cnt = 0; cnt < 3; cnt++) {
      for (let [beer, beerNum] of Object.entries(new_sales)) {
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

    setSales(new_sales);
    setOrders(new_orders);
    setPodium(new_podium);
    setQueue(new_queue);
  }

  const beers_style = {
    marginTop: "6%",
    display: "flex",
    justifyContent: "space-around",
  };

  return (
    <div className="App">
      {/* <button onClick={() => setCheck(!check)}>{check ? "on" : "off"}</button> */}
      <Welcome />
      <div className="beers" style={beers_style}>
        <Podium {...podium} />
        {/* <Carousel/> */}
        <Recommendation
          rec={rec}
          rec_img={images(
            `./beers/${rec.split(" ").join("").toLowerCase()}.png`
          )}
        />
      </div>
      <Queue queue={queue} />
    </div>
  );
}

export default App;
