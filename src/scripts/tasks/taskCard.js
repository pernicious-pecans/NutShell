const taskCard = (task) => {
  return `
  <h2> ${task.taskName}<h2>
    <p>${task.taskCompletionDate}<p>
    <button id='delete--task--${task.id}'>Delete ${task.taskName} </button>
    <button id='edit--task--${task.id}'>Delete ${task.taskName} </button>
    <div>
  <input type="checkbox" id="tasks" name="tasks">
  <label for="tasks">Completed</label>
</div>
  `
}
export default taskCard