const createTaskElement = (task) => {
const taskElm = `
    <article class="task">
hello
    </article>
  `;
};

const renderTaskElms = (taskArray) => {
  for (const task of taskArray) {
    $('.task').append(createTaskElement(task));
  }
};

renderTaskElms([
  {

  }
]);
