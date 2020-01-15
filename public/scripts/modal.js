$('.datepicker').datepicker({
  format: 'mm/dd/yyyy',
  startDate: '-3d'
});

const replaceTask = (taskToReplace, newTask) => {
  // $(newElement).data(newTask);
  const newElm = $(createTaskElement(newTask)).replaceAll(taskToReplace);
  newElm.data(newTask);
  // console.log('new task', newElement);
  // console.log(newElement, newElement.data())
};


const createUpdateTasks = function(e) {
  e.preventDefault();

  const categoryNameMapping = {
    'buy': 1,
    'eat': 2,
    'read': 3,
    'watch': 4
  };

  const data = {
    category_id: categoryNameMapping[$(this).find('#category').val()],
    task_name: $(this).find('#title').val(),
    schdule_date: null,
    completed_date: $(this).find('#checkbox').prop('checked') ? null : null,
    priority: null,
    details_url: null,
  };

  const options = {
    method: 'POST',
    url: `/tasks`,
    data: $.param(data)
  };

  const taskId = $(this).parents('#myModal').data('taskId');
  if (taskId) {
    options.method = 'PUT';
    options.url += `/${taskId}`;
    options.id = taskId;
  }
  // Need to removed attached data for next call
  $('#myModal').removeData('taskId');

  $.ajax(options)
    .done(function(res) {
      console.log('res', res.id);
      const tasksArray = [...$('.task-list').children('.task')];
      console.log(tasksArray)
      const taskToReplace = tasksArray.filter(function(taskElm) {
        return $(taskElm).data('id') === res.id;
      })[0];
      console.log('task to replace:', taskToReplace);
      if (taskToReplace) {
        replaceTask($(taskToReplace), res);
      } else {
        renderTaskElm(res);
      }
      $('#myModal').modal('hide');
    })
    .fail(function(err) {
      console.error('Failed to submit form', err);
    });
};

// == DOCUMENT READY ==
$(document).ready(function() {
  $('form').on('submit', createUpdateTasks);
});
