// Import
import taskDataManager from "./taskDataManager"
import taskCard from "./taskCard"
//

// display all tasks
const taskSpot = document.querySelector("#tasks_display")

const taskList =  {
    taskList: () => {
        taskDataManager.fetchTasks().then(
            (parsedTasks) => {
                taskSpot.innerHTML = "";
                parsedTasks.forEach(task => {
                    taskSpot.innerHTML += taskCard(task)
                })
            }
        )
    }
}

// Export
export default taskList
//