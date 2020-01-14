const createTaskElement = (task) => {
  const taskElm = `
    <article class="task container-fluid">
      <div class="row">
        <i class="fas fa-film col col-1"></i>
        <h3 class="task-name col col-8">task name</h3>
        <i class="far fa-flag col col-1"></i>
        <i class="fas fa-edit col col-1"></i>
        <i class="fas fa-trash col col-1"></i>
      </div>
      <div class="row">
        <div class="col col-1"></div>
        <p class="created-at col col-8">time</p>
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
    console.log('in loop')
    renderTaskElm(task);
  }
};

$(document).ready(function() {
  renderTaskElms([
    {},
    {},
  ]);
});
