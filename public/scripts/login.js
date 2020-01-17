

$(document).ready(function() {
  $('#logout-link').click(function() {
    console.log('in logout post')
    $.post('/logout');
    // $(`<form action="./logout" method="POST">
    //     <input type="hidden">
    //    </form>`).submit();
  });

});
