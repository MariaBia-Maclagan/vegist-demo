import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Favorites from "./components/Favorites";
import Search from "./components/Search";
import MainPhoto from "./Images/beet.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="nav--bar">
        <Link to="/">
          <button className="btn btn-outline-dark" style={{ margin: "5px" }}>
            HOME
          </button>
        </Link>
        <Link to="/favorites">
          <button className="btn btn-outline-dark" style={{ margin: "5px" }}>
            FAVORITES
          </button>
        </Link>
      </div>
      <div className="container">
        <h1>
          Vegist
          <img className="main--image" src={MainPhoto} alt="food" />
        </h1>
        <Routes>
          <Route exact path="/" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
