const createTaskElement = (task) => {
  const taskElm = `
    <article class="task container">
      <div class="row align-items-center">
        <i class="fas fa-film col col-1"></i>
        <h3 class="task-name col col-8">${task.task_name || 'default todo'}</h3>
        <i class="far fa-flag col col-1"></i>
        <i class="fas fa-edit col col-1"></i>
        <i class="fas fa-trash col col-1"></i>
      </div>
      <div class="row align-items-center">
        <div class="col col-1"></div>
        <p class="created-at col col-8">${task.scheduled_date || 'default time'}</p>
        <div class="col col-1"></div>
        <div class="col col-1"></div>
        <div class="col col-1"></div>
      </div>
    </article>
  `;
  return taskElm;
};

const renderTaskElm = (task) => {
  $('.task-list').append(createTaskElement(task));
};

const renderTaskElms = (taskArray) => {
  for (const task of taskArray) {
    renderTaskElm(task);
  }
};

// == Async functions ==
const editTask = function() {
  console.log('edit task')
};

const deleteTask = function() {
  console.log('delete task')
  console.log($(this))
};

// == Document Ready ==
$(document).ready(function() {
  $.get('/tasks')
    .then((tasks) => {
      console.log(tasks)
      renderTaskElms(tasks);
    })
    .fail((err) => {
      console.error('failed to get tasks', err.stack)
    });



  // edit button onClick event
  // must use on('click') to select dynamically generated content. $.click() doesn't work
  $('.task-list')
    .on(
      'click',
      '.task .fa-edit',
      // Add some data to pass to handler?,
      editTask
    );

  // Delete button onClick event
  $('.task-list')
    .on(
      'click',
      '.task .fa-trash',
      // Add some data to pass to handler?,
      deleteTask
    );
});
