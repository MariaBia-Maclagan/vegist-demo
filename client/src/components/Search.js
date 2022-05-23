import React, { useState } from "react";

export default function Search() {
  const [cuisine, setCuisine] = useState("");
  const [recipes, setRecipe] = useState([]);
  const [details, setDetails] = useState();
  const [favorites, setFavorites] = useState([]);

  const API_KEY = "fad10ccfd0c54a6381190e1d795d4647";

  const searchFood = async (e) => {
    e.preventDefault();

    const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&diet=vegan&number=200&apiKey=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setRecipe(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    setCuisine(event.target.value);
  };

  const handleSubmit = async (e) => {
    const url = `https://api.spoonacular.com/recipes/${e}/information?includeNutrition=false&apiKey=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      fetch("/api/vegist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          source_url: data.sourceUrl,
        }),
      })
        .then((res) => res.json())
        .then((updatedFav) => setFavorites(updatedFav))
        .catch((e) => console.error(e));
      setDetails(data.results);
    } catch (err) {
      console.error(err);
    }
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
