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
  const customer_id = req.body.customer_id
  const store_id = req.body.store_id
  const visiting_day = req.body.visiting_day
  const visiting_hour = req.body.visiting_hour
  console.log(customer_id)
  console.log(store_id)
  console.log(visiting_day)
  console.log(visiting_hour)

  return pool.query(`
    INSERT INTO reservations (customer_id, store_id, visiting_day, visiting_hour)
    VALUES ($1::integer, $2::integer, $3::integer, $4::VARCHAR)
  `,
    [customer_id, store_id, visiting_day, visiting_hour])
    .then(reservations => {
      console.log('yayayayya')
      // console.log(reservations)
      res.send(reservations.rows)
    })
    .catch(err => {
      console.error('query error', err.stack)
      res.send("ERROR");
    });
  })

module.exports = router;