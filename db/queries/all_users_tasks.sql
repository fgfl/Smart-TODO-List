SELECT task_name,categories.category_name 
  FROM tasks
    JOIN categories ON categories.id = category_id
  WHERE user_id = 2
  ORDER BY created_date;