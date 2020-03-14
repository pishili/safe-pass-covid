var express = require("express");
var router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'example',
    host: 'localhost',
    port: 5672,
    database: 'project'
})


router.get("/", (req, res, next) => {
  pool.query(`
  SELECT name
  FROM members;
`)
    .then(result => {
      console.log(result.rows.length);
      res.send(result.rows)
    })
    .catch(err => {
      console.error('query error', err.stack)
      res.send("ERROR");
    });

});

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  pool.query(`
  SELECT name
  FROM members
  WHERE user_id = ${userId};
`)
    .then(result => {
      console.log("member for specific user")
      console.log(result.rows.length);
      res.send(result.rows)
    })
    .catch(err => {
      console.error('query error', err.stack)
      res.send("ERROR");
    });

});

module.exports = router;