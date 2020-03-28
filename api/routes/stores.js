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


const getStores = (storeId) => {
  return pool.query(`
  SELECT name, location, capacity, store_id, vendor_id, json_agg(json_build_object('visiting_hour', visiting_hour, 'reserved_spots', reserved_spots)) as slots
  FROM
    (SELECT store_id, visiting_hour, COUNT(customer_id) as reserved_spots
    FROM reservations
    GROUP BY store_id, visiting_hour
    ) as r
  JOIN stores ON stores.id = r.store_id
  JOIN vendors ON vendors.id = stores.vendor_id
  GROUP BY name, location, store_id, vendor_id, capacity
    ;
  `)
}

router.get("/", (req, res, next) => {
  getStores()
    .then(stores => {
      res.send(stores.rows)
    })
    .catch(err => {
      console.error('query error', err.stack)
      res.send("ERROR");
    });

});

module.exports = router;