import React, { useState, useEffect } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [favoriteId, setFavoriteId] = useState("");

  useEffect(() => {
    fetch("/api/vegist")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setFavorites(json);
      })
      .catch((error) => {});
  }, []);

  function getFavoriteID(favoriteId) {
    fetch(`api/vegist/${favoriteId}`)
      .then((result) => result.json())
      .then((favoriteId) => {
        setFavoriteId(favoriteId);
      })
      .catch((err) => {
        console.log(`Error: ${err.message}`);
      });
  }

  useEffect(() => {
    getFavoriteID(favoriteId);
    // eslint-disable-next-line
  }, []);

  const handleDelete = (favorite) => {
    deleteFavorite(favorite);
  };

  const deleteFavorite = (favorite) => {
    console.log("deleteFavorite api", favorite);
    fetch(`/api/vegist/${favorite}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedFavs) => {
        setFavorites(updatedFavs);
        console.log("deleteFavorite api update", updatedFavs);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="card--list">
      <h2 className="card--title">Saved Recipes</h2>
      {favorites.map((favorite, index) => {
        return (
          <div className="card-content" key={index}>
            <div className="card">
              {favorite.title}
              <a href={favorite.source_url}>
                <button type="button" className="btn--view">
                  link to recipe
                </button>
              </a>
              <button
                type="button"
                className="btn--delete btn btn-danger"
                style={{ margin: "10px" }}
                onClick={() => handleDelete(favorite.id)}
              >
                X
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
