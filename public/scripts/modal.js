$('.datepicker').datepicker({
  format: 'mm/dd/yyyy',
  startDate: '-3d'
});


const createUpdateTasks = function(e) {
  e.preventDefault();

  const categoryNameMapping = {
    'buy': 1,
    'eat': 2,
    'read': 3,
    'watch': 4
  }
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

  console.log($.param(data));
  console.log($(this).serialize())
  console.log($(this).find('#checkbox').prop('checked'));

  console.log($(this).find('#category').val())
  $.ajax(options)
    .done(function(res) {

    })
    .fail(function(err) {
      console.error('Failed to submit form', err);
    });
};

// == DOCUMENT READY ==
$(document).ready(function() {

  $('form').on('submit', createUpdateTasks);
});
