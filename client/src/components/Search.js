import React, { useState } from "react";
import Summary from "./Summary";


export default function Search() {
  const [cuisine, setCuisine] = useState("");
  const [recipes, setRecipe] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchFood = async (e) => {
    e.preventDefault();

    fetch("/api/vegist/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cuisine: cuisine }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setCuisine(event.target.value);
    //console.log(cuisine)
  };

  const handleSubmit = async (e) => {
    fetch("/api/vegist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e,
      }),
    })
      .then((res) => res.json())
      .then((updatedFav) => setFavorites(updatedFav))
      .catch((e) => console.error(e));
  };

  return (
    <>
      <form className="form" onSubmit={searchFood}>
        <input
          className="input"
          type="text"
          onFocus="this.value=''"
          name="query"
          placeholder="favorite cuisine...?"
          value={cuisine}
          onChange={(e) => handleChange(e)}
        />
        <button className="button" type="submit">
          click me!
        </button>
      </form>
      <div className="card--list">
        {recipes
          .filter((recipe) => recipe)
          .map((recipe) => (
            <div >
              <h3 className="card--title">{recipe.title}</h3>
              <div className="card md-3" key={recipe.id}>
                <div className="row">
                  <div className="col-md-8">
                <img
                  className="card--image img-fluid"
                  src={`${recipe.image}`}
                  alt={recipe.title}
                />
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                <button
                  type="button"
                  className="btn--save"
                  onClick={() => handleSubmit(recipe.id)}
                >
                  add to favorites
                </button>
                </div>
                </div>
                <div className="col-md-12 mt-2">
                <Summary recipeId = {recipe.id}/>
                </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
