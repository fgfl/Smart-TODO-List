const SLIDEOUT_TIME = 600;
const REENTER_DELAY = 300;
const SHOW_HIDE_DELAY = 500;

const getTaskList = () => {
  return [...$('.task-list').find('.task')];
};

const getCompletedList = () => {
  return getTaskList().filter((task) => $(task).data('completed_date'));
};

const getNotCompletedList = () => {
  return getTaskList().filter((task) => !$(task).data('completed_date'));
};

const getHideListByCategory = (categoryName) => {
  return getTaskList().filter((task) => $(task).data('category_name') !== categoryName);
};

const getShowListByCategory = (categoryName) => {
  return getTaskList().filter((task) => $(task).data('category_name') === categoryName);
};

const animateSort = (taskList, listToHide, listToShow) => {
  const options = {
    duration: SLIDEOUT_TIME,
    queue: false,
  };

  const slideOut = taskList
                    .animate({
                      'translate': '-100%',
                    },
                    options)
                    .promise()

  const hide = $(listToHide).hide(SHOW_HIDE_DELAY).promise();

  $.when(slideOut, hide).then(function() {
    setTimeout(() => {
      taskList
        .animate({
          'translate': '0%',
        },
        options)
        .promise();

      $(listToShow).show(SHOW_HIDE_DELAY).promise();
    }, REENTER_DELAY);
  });
};

const applyAllSort = function() {
  animateSort(
    $('.task-list'),
    [],
    getTaskList());
};

const applyWatchSort = function() {
  animateSort(
    $('.task-list'),
    getHideListByCategory('watch'),
    getShowListByCategory('watch'));
};

const applyReadSort = function() {
  animateSort(
    $('.task-list'),
    getHideListByCategory('read'),
    getShowListByCategory('read'));
};

const applyEatSort = function() {
  animateSort(
    $('.task-list'),
    getHideListByCategory('eat'),
    getShowListByCategory('eat'));
};

const applyBuySort = function() {
  animateSort(
    $('.task-list'),
    getHideListByCategory('buy'),
    getShowListByCategory('buy'));
};

const applyCompletedSort = function() {
  animateSort(
    $('.task-list'),
    getNotCompletedList(),
    getCompletedList());
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
