const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const queryString = `SELECT * FROM tasks
      JOIN categories ON categories.id = category_id
    WHERE user_id = $1
    ORDER BY created_date;`;
    const queryParams = [req.session.user_id];

    db.query(queryString, queryParams)
      .then(data => {
        const users = data.rows;
        console.log(users);
        res.json({
          users
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });

  router.post("/", (req, res) => {
    const queryString = `
      INSERT INTO tasks (
        category_id,
        user_id,
        task_name,
        schedule_date,
        completed_date,
        priority,
        details_url)
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )
      RETURNING *;
    `;
    console.log('lkajsdlfjlsdjkf', req.body);
    const queryParams = [
      Number(req.body.category_id),
      Number(req.session.user_id || 3),
      req.body.task_name,
      req.body.scheduled_date ? req.body.scheduled_date : null,
      req.body.completed_date ? req.body.completed_date : null,
      req.body.priority ? req.body.priority : null,
      req.body.details_url ? req.body.details_url : null
    ];

    // console.log(req.query, 'casting', Number(req.query.category_id),
    //   Number(req.query.user_id),
    //   req.query.priority);
    console.log(queryParams);

    db.query(queryString, queryParams)
      .then(data => {
        const users = data.rows;
        console.log(users);
        res.json({
          users
        });
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });
  router.put("/:taskId", (req, res) => {
    res.send(`${req.params.taskId}`);
    //   db.query(`SELECT * FROM users;`)
    //     .then(data => {
    //       const users = data.rows;
    //       console.log(users);
    //       res.json({
    //         users
    //       });
    //     })
    //     .catch(err => {
    //       res
    //         .status(500)
    //         .json({
    //           error: err.message
    //         });
    //     });
  });

  router.delete("/:taskId", (req, res) => {
    const queryString = `
      UPDATE tasks
        SET is_active = false
        WHERE user_id = $1
        AND tasks.id = $2
        RETURNING *;
    `;
    const queryParams = [
      Number(req.session.user_id) || 1,
      Number(req.params.taskId)
    ];
      db.query(queryString, queryParams)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: err.message
            });
        });
  });
  return router;
};
