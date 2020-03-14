var express = require("express");
var router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'docker',
    password: 'example',
    host: 'localhost',
    port: 5672,
    database: 'project'
})

router.get("/", (req, res, next) => {
  pool.query(`
  SELECT name
  FROM members
  LIMIT 1;
  `)
  .then(res => {
    console.log(res);
  })
  .catch(err => console.error('query error', err.stack));
    console.log('Family Members');
    res.send("Let's Pass COVID-19 SAFE");
});

module.exports = router;