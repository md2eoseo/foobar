import React, { useState, useEffect } from "react";
import "./App.css";

const DB_URL = "https://neonapp.herokuapp.com/";

function App() {
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
        console.log(`fetched following data -> ${JSON.stringify(data)}`);
      });
  }

  return <div className="App">Foo Bar</div>;
}

export default App;
