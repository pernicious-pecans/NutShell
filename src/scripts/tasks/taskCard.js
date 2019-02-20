const taskCard = (task) => {
  return `
  <h2> ${task.taskName}<h2>
    <p>${task.taskCompleteDate}<p>
    <button id='edit--task--${task.id}'>Edit ${task.taskName} </button>
    <div>
  <input type="checkbox" id="tasks" name="tasks">
  <label for="tasks">Completed</label>
</div>
  `
}

//EXPORT
export default taskCard