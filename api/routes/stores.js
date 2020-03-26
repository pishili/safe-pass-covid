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

  //SELECT store_id, visiting_hour, COUNT(*) FROM reservations
  // GROUP BY store_id, visiting_hour;

  pool.query(`
  SELECT * FROM stores
  JOIN vendors ON vendors.id = stores.vendor_id
  JOIN (
	  SELECT store_id, visiting_hour, COUNT(*) reservedSpots
        FROM reservations
        GROUP BY store_id, visiting_hour
      ) c ON c.store_id = stores.id;
  `)
    .then(result => {
      console.log(result.rows.length);
      const resultList = []
      result.rows.forEach((item) => {
        console.log(item)
        resultList.push(
          {
            name: item.name,
            location: item.location,
            capacity: item.capacity,
            slots: {
              'time': item.visiting_hour,
              'reservedSpots': Number(item.reservedspots)
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