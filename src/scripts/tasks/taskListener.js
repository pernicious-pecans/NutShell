// IMPORT
import taskDataManager from "./taskDataManager"
import eventDataManager from "../events/evtDataMgr";
import taskList from "./taskList";
import clearTaskForm from "./clearTaskForm"

const $ = document.querySelector.bind(document)

const enterTask = () => {

    const taskButton = $("#enterTask")

    taskButton.addEventListener("click", () => {
        const newTask = {
            userId: $("#userId").value,
            taskName: $("#taskName").value,
            taskCompleteDate: $("#taskCompleteDate").value
        }

        if (taskButton.textContent.startsWith("Save")) {
            console.log("To Do:", newTask)
            taskDataManager.saveTask(newTask)
                .then(() => taskList.taskList())
                .then(() => clearTaskForm())

        }

        else if (taskButton.textContent.startsWith("Update")) {
            const id = $("taskId").value
            taskDataManager.editTask(parseInt(id), newTask)
                .then(() => taskList.taskList())
                .then(() => clearTaskForm.clearTaskForm())
                .then(() => {
                    document.querySelector("#taskFormAction").textContent = "Save Task"
                })
        }

    })
}

//EXPORT
export default enterTask