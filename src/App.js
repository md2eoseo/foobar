import React, { useState, useEffect } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Podium from "./components/Podium";

const DB_URL = "https://neonapp.herokuapp.com/";

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

  useEffect(() => get(), []);

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
        const added = [];

        // get new order from Queue data
        data.queue.forEach((new_order) => {
          let i = 0;
          for (i = 0; i < orders.length; i++) {
            if (new_order.id === orders[i].id) break;
          }
          if (i === orders.length) {
            added.push(new_order);
            new_order.order.forEach((beer) => {
              if (sales[beer]) {
                sales[beer] += 1;
              } else {
                sales[beer] = 1;
              }
              setSales(sales);
            });
          }
        });

        // get new order from Serving data
        data.serving.forEach((new_order) => {
          let i = 0;
          for (i = 0; i < orders.length; i++) {
            if (new_order.id === orders[i].id) break;
          }
          if (i === orders.length) {
            added.push(new_order);
            new_order.order.forEach((beer) => {
              if (sales[beer]) {
                sales[beer] += 1;
              } else {
                sales[beer] = 1;
              }
              setSales(sales);
            });
          }
        });

        setOrders(orders.concat(added));
        calculatePodium();
        console.log(`podium ==> ${JSON.stringify(podium)}`);
        console.log(`sales ==> ${JSON.stringify(sales)}`);
        console.log(`orders ==> ${JSON.stringify(orders)}`);
        console.log(
          `fetched following data -> ${JSON.stringify(data.serving)}`
        );
      });
  }

  function calculatePodium() {
    let new_podium = podium;
    for (let [beer, value] of Object.entries(sales)) {
      if (sales[beer] > podium.first_num) {
        new_podium.third = new_podium.second;
        new_podium.third_num = new_podium.second_num;
        new_podium.second = new_podium.first;
        new_podium.second_num = new_podium.first_num;
        new_podium.first = beer;
        new_podium.first_num = sales[beer];
      } else if (sales[beer] > podium.second_num) {
        new_podium.third = new_podium.second;
        new_podium.third_num = new_podium.second_num;
        new_podium.second = beer;
        new_podium.second_num = sales[beer];
      } else if (sales[beer] > podium.third_num) {
        new_podium.third = beer;
        new_podium.third_num = sales[beer];
      }
    }
    setPodium(new_podium);
  }

  return (
    <div className="App">
      <button onClick={() => setCheck(!check)}>{check}</button>
      <Welcome />
      <div className="beers">
        <Podium {...podium} />
      </div>
    </div>
  );
}

export default App;
