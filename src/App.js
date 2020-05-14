import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Podium from "./components/Podium";

const DB_URL = "https://neonapp.herokuapp.com/";

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

  // useEffect(get, []);
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
        calculatePodium();
        // console.log(`podium ==> ${JSON.stringify(podium)}`);
        // console.log(`sales ==> ${JSON.stringify(sales)}`);
        // console.log(`orders ==> ${JSON.stringify(orders)}`);
        // console.log(
        //   `fetched following data -> ${JSON.stringify(
        //     data.serving.concat(data.queue)
        //   )}`
        // );
      });
  }

  function calculatePodium() {
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

  return (
    <div className="App">
      <button onClick={() => setCheck(!check)}>{check ? "on" : "off"}</button>
      <Welcome />
      <div className="beers">
        <Podium {...podium} />
      </div>
    </div>
  );
}

export default App;
