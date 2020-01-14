const createTaskElement = (task) => {
  // Mapping of category ID to the icon class name from fontAwesome
  const categoryMapping = {
    '1': 'fa-cart-arrow-down', // product / buy
    '2': 'fa-utensils', // food / eat
    '3': 'fa-book-open', // books / read
    '4': 'fa-film', // movies / watch
  };
  const categoryIcon = categoryMapping[task.category_id];

  // Using Bootstrap's gridding system
  const taskElm = `
    <article class="task container">
      <div class="row align-items-center">
        <i class="fas ${categoryIcon} col col-1"></i>
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
  const taskList = $('.task-list');
  taskList.append(createTaskElement(task));
  taskList.children('.task:last-child').data(task);
  console.log(taskList.children('.task:last-child').data());

  const newElm = taskList.children('.task:last-child');

  console.log('newelem\n', newElm);
};

const renderTaskElms = (taskArray) => {
  for (const task of taskArray) {

    renderTaskElm(task);
  }
};

// == Async functions ==
const deleteTask = function(event) {
  // console.log('event', event);
  // console.log('delete task', $(this))
  const taskElm = $(this).parents('.task');
  console.log(taskElm.data());
  console.log(taskElm.data('id'));
  const options = {
    method: 'DELETE',
    url: `/tasks/${taskElm.data('id')}`,
  };
  $.ajax(options)
    .done(function(res) {
      taskElm.remove();
    })
    .fail(function(err) {
      console.error('Failed to remove task from DB', err);
    });
};

const editTask = function() {
  const taskElm = $(this).parents('.task');
  const taskData = taskElm.data();
  $('#myModal').on('show.bs.modal', function(event) {
    const modal = $(this);
    modal.find('#checkbox').prop('checked', (taskData.completed_at));
    modal.find('#title').val(taskData.task_name);
    modal.find('#category').val(taskData.category_name);
    modal.off('show.bs.modal');
  });
  $("#newTask").click();
};

// == Document Ready ==
$(document).ready(function() {
  $.get('/tasks')
    .then((tasks) => {
      console.log(tasks);
      renderTaskElms(tasks);
    })
    .fail((err) => {
      console.error('failed to get tasks', err.stack);
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
