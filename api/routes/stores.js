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
  SELECT *
  FROM stores
  INNER JOIN vendors ON stores.vendor_id =  vendors.id;
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

module.exports = router;