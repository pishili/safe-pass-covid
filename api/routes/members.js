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
  SELECT name, age, location
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
  SELECT name, age, location
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


router.post("/", (request, response) => {
  if (process.env.TEST_ERROR) {
    setTimeout(() => response.status(500).json({}), 1000);
    return;
  }

  const name = request.body.name;
  const age = request.body.age;
  const location = request.body.location;
  console.log(name);
  console.log(age);
  console.log(location);

  pool.query(
    `
    INSERT INTO members (name, age, location)
    VALUES ($1::VARCHAR, $2::VARCHAR, $3::VARCHAR)
  `,
    [name, age, location]
  )
    .then(() => {
      setTimeout(() => {
        response.status(204).json({});
      }, 1000);
    })
    .catch(error => console.log(error));
});


module.exports = router;