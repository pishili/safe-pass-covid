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

router.get("/:vendorId", (req, res) => {
  const vendorId = req.params.vendorId

  return pool.query(`
  SELECT vendor_id, vendors.name, COUNT(customer_id) as reserved_spots, reservations.visiting_hour, store_id FROM stores
	JOIN vendors ON vendors.id = stores.vendor_id
  JOIN reservations ON reservations.store_id = stores.id
  WHERE vendors.id = $1::integer
  GROUP BY vendor_id, name, reservations.store_id, reservations.visiting_hour;
  `,
    [vendorId])
    .then(vendors => {
      console.log(vendors.rows)
      res.send(vendors.rows)
    })
    .catch(err => {
      console.error('query error', err.stack)
      res.send("ERROR");
    });
})

module.exports = router;