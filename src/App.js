import React, { useState, useEffect } from "react";
import "./App.css";
import useInterval from "./hooks/useInterval";
import Welcome from "./components/Welcome";
import Podium from "./components/Podium";
import Recommendation from "./components/Recommendation";
import Queue from "./components/Queue";
import Showcase from "./components/Showcase";

const DB_URL = "https://sojuapp.herokuapp.com/";
// https://stackoverflow.com/questions/54059179/what-is-require-context
const images = require.context("./images/", true);

function App() {
  // const [check, setCheck] = useState(false);
  const [beertypes, setBeertypes] = useState([]);
  const [rec, setRec] = useState("default");
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
  const [queue, setQueue] = useState([]);
  const [prevQueue, setPrevQueue] = useState([]);

  useInterval(get, 5000);
  useEffect(getBeertypes, []);
  useEffect(compare, [queue]);

  function compare() {
    const copy_queue = [...queue];
    const copy_prevQueue = [...prevQueue];
    const gone = [];
    const added = [];
    let i = 0;
    let j = 0;

    // find which order went to serving data
    for (i = 0; i < copy_prevQueue.length; i++) {
      for (j = 0; j < copy_queue.length; j++) {
        if (JSON.stringify(copy_prevQueue[i]) === JSON.stringify(copy_queue[j]))
          break;
      }
      if (j === copy_queue.length) gone.push(copy_prevQueue[i]);
    }

    // find which order added into queue
    for (i = 0; i < copy_queue.length; i++) {
      for (j = 0; j < copy_prevQueue.length; j++) {
        if (JSON.stringify(copy_queue[i]) === JSON.stringify(copy_prevQueue[j]))
          break;
      }
      if (j === copy_prevQueue.length) added.push(copy_queue[i]);
    }

    setPrevQueue(copy_queue);
  }

  function getBeertypes() {
    fetch(DB_URL + "beertypes", {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else console.log("GET failed!");
      })
      .then((data) => {
        // store the data of beers
        setBeertypes(data);
      });
  }

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
  }

  function setSalesOrdersPodium(data) {
    const new_orders = [...orders];
    const new_sales = { ...sales };
    const new_podium = {
      first: "default",
      second: "default",
      third: "default",
      first_num: 0,
      second_num: 0,
      third_num: 0,
    };
    const old_queue = [...prevQueue];
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

    // set Podium with stored data(sales)
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
    // https://www.samanthaming.com/tidbits/33-how-to-compare-2-objects/
    if (JSON.stringify(old_queue) !== JSON.stringify(new_queue)) {
      console.log("changed!!");
      setQueue(new_queue);
    }
  }

  const beers_style = {
    marginTop: "3%",
    display: "flex",
    justifyContent: "space-around",
  };

  return (
    <div className="App">
      {/* <button onClick={() => setCheck(!check)}>{check ? "on" : "off"}</button> */}
      <Welcome />
      <div className="beers" style={beers_style}>
        <Podium {...podium} />
        <Showcase data={beertypes} />
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
