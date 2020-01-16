const getTaskList = () => {
  return [...$('.task-list').find('.task')];
};

const applyAllSort = function() {
  console.log("asasdfsef");
};

const applyWatchSort = function() {
  console.log('asdf');
};

const applyReadSort = function() {
  console.log('asdf');

};

const applyEatSort = function() {
  console.log('asdf');

};

const applyBuySort = function() {
  console.log('asdf');

};

const applyCompletedSort = function() {
  console.log('asdf');

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
