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
  JOIN reservations on reservations.store_id = stores.id
  JOIN vendors on vendors.id = stores.vendor_id;
`)
    .then(result => {
      console.log(result.rows.length);
      const resultList = []
      result.rows.forEach((item) => {
        resultList.push(
          {
            name: item.name,
            location: item.location,
            capacity: item.capacity,
            slots: {
              'times': item.visting_hour,
              'reservedSpots': 50
            }
          })
      })
      res.send(resultList)
    })
    .catch(err => {
      console.error('query error', err.stack)
      res.send("ERROR");
    });

});

module.exports = router;