var express = require("express");
var router = express.Router();
const db = require("../model/helper");

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
  let favorite_id = req.params.id;
  let sql = `
    SELECT *
    FROM favorites
    WHERE id = ${favorite_id}
  `;
  ("catch");
  try {
    let results = await db(sql);
    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/vegist", (req, res) => {
  console.log(req);
  db(
    `INSERT INTO favorites (title, source_url) VALUES ("${req.body.title}" , "${req.body.source_url}");`
  )
    .then(() => {
      sendAllFavorites(req, res);
    })
    .catch((err) => res.status(500).send(err));
});

router.delete("/:id", async (req, res) => {
  let favorite_id = req.params.id;
  try {
    let sql = `SELECT * FROM favorites WHERE id = ${favorite_id}`;
    let results = await db(sql);
    if (results.data.length === 1) {
      sql = `DELETE FROM favorites WHERE id = ${favorite_id}`;
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
