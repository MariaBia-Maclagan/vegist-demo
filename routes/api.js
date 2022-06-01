const express = require("express");
const router = express.Router();
const db = require("../model/helper");
require("dotenv").config();

const fetch = require("node-fetch"); // installed fetch on back end to fetch from api

const sendAllFavorites = (req, res) => {
  db("SELECT * FROM favorites ORDER BY id ASC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
};

router.get("/vegist", (req, res) => {
  sendAllFavorites(req, res);
});

router.get("/vegist/:id", async (req, res) => {
  let favoriteId = req.params.id;
  let sql = `SELECT * FROM favorites WHERE id = ${favoriteId}`;

  try {
    let results = await db(sql);

    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/info", (req, res) => {
  const url = `https://api.spoonacular.com/recipes/${req.body.recipeId}/summary?&apiKey=${process.env.API_KEY}`;

  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    res.send(data);
  })
  .catch((err) => res.status(500).send(err));
});


router.post("/vegist/recipes", (req, res) => {
  const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${req.body.cuisine}&diet=vegan&number=200&apiKey=${process.env.API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.send(data.results);
    })
    .catch((err) => res.status(500).send(err));
});

router.post("/vegist", async (req, res) => {
  const url = `https://api.spoonacular.com/recipes/${req.body.id}/information?includeNutrition=false&apiKey=${process.env.API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      db(
        `INSERT INTO favorites (title, source_url) VALUES ("${data.title}" , "${data.sourceUrl}");`
      )
        .then(() => {
          sendAllFavorites(req, res);
        })
        .catch((err) => res.status(500).send(err));
    });
});

router.delete("/vegist/:id", async (req, res) => {
  let favoriteId = req.params.id;

  try {
    let sql = `SELECT * FROM favorites WHERE id = ${favoriteId}`;
    let results = await db(sql);

    if (results.data.length === 1) {
      sql = `DELETE FROM favorites WHERE id = ${favoriteId}`;
      await db(sql);
      results = await db("SELECT * from favorites");
      res.send(results.data);
    } else {
      res.status(404).send({ error: "Error 404" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }


});

module.exports = router;
