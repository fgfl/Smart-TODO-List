  UPDATE tasks
        SET
          category_id = 1,
          user_id = 1,
          task_name = 'Something',
          scheduled_date = null,
          completed_date = null,
          priority = null,
          details_url = null
        FROM categories
        WHERE tasks.id = 1 AND category_id = categories.id
        RETURNING *;
