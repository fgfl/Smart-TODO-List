$('.datepicker').datepicker({
  format: 'mm/dd/yyyy',
  startDate: '-3d'
});

const replaceTask = (task) => {
  console.log('Im in replace task');
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
      console.log(res);
      renderTaskElm(res);
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
