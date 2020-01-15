const express = require('express');
const router = express.Router();
const {
  fetchCategory
} = require('./help_files/get_category');

module.exports = (db) => {
  const insertTask = function(req, res, catName) {
    const queryParams = [
      catName ? 2 : Number(req.body.category_id),
      Number(req.session.user_id),
      req.body.task_name,
      req.body.scheduled_date ? req.body.scheduled_date : null,
      req.body.completed_date ? req.body.completed_date : null,
      req.body.priority ? req.body.priority : null,
      req.body.details_url ? req.body.details_url : null
    ];

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

    db.query(queryString, queryParams)
      .then(data => {
        const task = data.rows[0];
        res.send(task);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  };



  router.get("/", (req, res) => {
    const queryString = `
      SELECT
          tasks.id,
          category_id,
          category_name,
          user_id,
          task_name,
          created_date,
          schedule_date,
          completed_date,
          priority,
          details_url,
          is_active
        FROM tasks
          JOIN categories ON categories.id = category_id
        WHERE user_id = $1
          AND is_active = TRUE
        ORDER BY created_date;
    `;
    const queryParams = [req.session.user_id];

    db.query(queryString, queryParams)
      .then(data => {
        const tasks = data.rows;
        res.send(tasks);
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
    if (!req.body.category_id) {
      fetchCategory(req.body.task_name)
        .then(probability => {
          const items = probability.classification;
          let highest = 0;
          let catName = "buy";
          for (const item in items) {
            if (items.item > highest) {
              highest = items.item;
              catName = item;
            }
          }
          insertTask(req, res, catName);
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: err.message
            });
        });
    } else {
      insertTask();
    }
  });



  router.put("/:taskId", (req, res) => {
    const queryString = `
      UPDATE tasks
        SET
          category_id = $1,
          user_id = $2,
          task_name = $3,
          schedule_date = $4,
          completed_date = $5,
          priority = $6,
          details_url = $7
        WHERE id = $8
        RETURNING *;
    `;
    const queryParams = [
      Number(req.body.category_id),
      Number(req.session.user_id || 3),
      req.body.task_name,
      req.body.scheduled_date ? req.body.scheduled_date : null,
      req.body.completed_date ? req.body.completed_date : null,
      req.body.priority ? req.body.priority : null,
      req.body.details_url ? req.body.details_url : null,
      req.params.taskId
    ];

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

  router.delete("/:taskId", (req, res) => {
    const queryString = `
      UPDATE tasks
        SET is_active = false
        WHERE user_id = $1
          AND tasks.id = $2
        RETURNING *;
    `;
    const queryParams = [
      Number(req.session.user_id),
      Number(req.params.taskId)
    ];

    console.log('params', queryParams)
    db.query(queryString, queryParams)
      .then(data => {
        res.send(data.rows[0]);
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
