const $ = document.querySelector.bind(document)
const enterTask = () => {

    const taskButton = $("#enterTask")

    taskButton.addEventLister("click", () => {
        const newTask = {
            user: {
                iserId: $("userId").value
            },
            taskName: $("taskName").value,
            taskCompleteDate: $("taskCompleteDate").value
        }

        if (taskButton.textContent.startsWith("Save")) {
            console.log("To Do:", newTask)
            fetch("http://localhost:8088/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)

            }).then(clearTaskForm)
        }
        else if (taskButton.textContent.startsWith("Update")) {

            fetch(`http://localhost:8088/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            }).then(clearTaskForm)

        }

    })
}
export default enterTask