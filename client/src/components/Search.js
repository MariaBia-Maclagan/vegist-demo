import React, { useState } from "react";

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
      body: JSON.stringify({
        cuisine: cuisine,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipe(data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setCuisine(event.target.value);
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
          onfocus="this.value=''"
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
            <div>
              <h3 className="card--title">{recipe.title}</h3>
              <div className="card" key={recipe.id}>
                <img
                  className="card--image"
                  src={`${recipe.image}`}
                  alt={recipe.title}
                />
                <button
                  type="button"
                  className="btn--save"
                  onClick={() => handleSubmit(recipe.id)}
                >
                  add to favorites
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
