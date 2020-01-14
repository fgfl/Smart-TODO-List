const createTaskElement = (task) => {
  const taskElm = `
    <article class="task container">
      <div class="row">
        <i class="fas fa-film col col-1"></i>
        <h3 class="task-name col col-8">${task.taskName || 'default todo'}</h3>
        <i class="far fa-flag col col-1"></i>
        <i class="fas fa-edit col col-1"></i>
        <i class="fas fa-trash col col-1"></i>
      </div>
      <div class="row">
        <div class="col col-1"></div>
        <p class="created-at col col-8">${task.scheduledDate || 'default time'}</p>
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
};

// == Document Ready ==
$(document).ready(function() {
  renderTaskElms([
    {},
    {},
    {},
  ]);

  $('.task .fa-edit').click(editTask);
  $('.task .fa-trash').click(deleteTask);
});
