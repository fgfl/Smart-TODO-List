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
  WHERE user_id = 1
  ORDER BY schedule_date ASC, created_date ASC, priority DESC;
