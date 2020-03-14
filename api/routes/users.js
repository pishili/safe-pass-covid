var express = require('express');
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
  SELECT name, email
  FROM users
  LIMIT 5;
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


router.post("/", (request, response) => {
  if (process.env.TEST_ERROR) {
    setTimeout(() => response.status(500).json({}), 1000);
    return;
  }

  const name = request.body.name;
  const email = request.body.email;

  console.log(name);
  console.log(email);
  // response.send(name)

  pool.query(
    `
    INSERT INTO users (name, email)
    VALUES ($1::VARCHAR, $2::VARCHAR)
  `,
    [name, email]
  )
    .then(() => {
      setTimeout(() => {
        response.status(204).json({});
      }, 1000);
      console.log('yaya')
    })
    .catch(error => console.log(error));
});

router.put("/:id", (request, response) => {
  if (process.env.TEST_ERROR) {
    setTimeout(() => response.status(500).json({}), 1000);
    return;
  }

  const name = request.body.name;
  const email = request.body.email;
  const id = Number(request.params.id);

  pool.query(
    `
    UPDATE users
    SET name = $1::VARCHAR, email = $2::VARCHAR
    WHERE id = $3::integer
  `,
    [name, email, id]
  )
    .then(() => {
      setTimeout(() => {
        response.status(204).json({});
      }, 1000);
    })
    .catch(error => console.log(error));
});



module.exports = router;