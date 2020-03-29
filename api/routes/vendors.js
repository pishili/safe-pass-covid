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

router.post("/", (req, res) => {
  const vendor_id = req.body.vendor_id
  console.log(vendor_id)
  

  return pool.query(`
    SELECT name FROM vendors;
  `,
    [])
    .then(vendors => {
      res.send(vendors.rows)
    })
    .catch(err => {
      console.error('query error', err.stack)
      res.send("ERROR");
    });
  })

module.exports = router;