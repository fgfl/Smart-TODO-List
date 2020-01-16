const SLIDEOUT_TIME = 600;
const REENTER_DELAY = 300;

const getTaskList = () => {
  return [...$('.task-list').find('.task')];
};

const animateSort = (taskList, categoryName) => {

  const listToHide = getTaskList().filter((task) => $(task).data('category_name') !== categoryName);

  const slideOut = taskList
                    .animate({
                      'translate': '-100%',
                    }, SLIDEOUT_TIME)
                    .promise()

  const hide = $(listToHide).hide(500).promise();

  $.when(slideOut, hide).then(function() {
    setTimeout(() => {
      taskList
        .animate({
          'translate': '0%',
        }, SLIDEOUT_TIME)
        .promise();
    }, REENTER_DELAY);
  });
};

const applyAllSort = function() {
  getTaskList().sort()
};

const applyWatchSort = function() {
  console.log('asdf')
  animateSort($('.task-list'), 'read')
  // const buyList = getTaskList().filter((task) => $(task).data('category_name') === 'watch');

  // $('.task-list').animate({
  //   'translate': '-100%'
  // })
  // .promise()
  // .then(function() {
  //   buyList.forEach(task => {
  //     $(task).hide();
  //   });

  //   setTimeout(() => {
  //     $('.task-list').animate({
  //       'translate': '0%'
  //     })},
  //     300);
  // });

};

const applyReadSort = function() {
  console.log('asdf')

};

const applyEatSort = function() {
  console.log('asdf')

};

const applyBuySort = function() {
  console.log('asdf')

};

const applyCompletedSort = function() {
  console.log('asdf')

};

// == DOCUMENT READY ==
$(document).ready(function() {
  $('#sort-all').click(applyAllSort);
  $('#sort-watch').click(applyWatchSort);
  $('#sort-eat').click(applyEatSort);
  $('#sort-read').click(applyReadSort);
  $('#sort-buy').click(applyBuySort);
  $('#sort-completed').click(applyCompletedSort);
});
