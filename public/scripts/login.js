

$(document).ready(function() {
  $('#logout-link').click(function() {
    console.log('in logout post')
    $.post('/logout');
  });

});
