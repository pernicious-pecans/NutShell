const taskDataManager = {

    // Complete Fetch of all tasks
    fetchTasks: () => {
        return fetch("http://localhost:8088/tasks")
            .then(Return => Return.json())

            .then(parsedTasks => {
                console.log(parsedTasks)
                return parsedTasks
            })
    },
    // Get (retrieve) single task by ID
    getTask: (taskId) => {
        return fetch(`http://localhost:8088/tasks/${taskId}`)
            .then(tasks => tasks.json())
            .then(parsedTask => {
                return parsedTask
            })

    },
    // Put updated task back to json by taskID
    editTask: (taskId, task) => {
        return fetch(`http://localhost:8088/task/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
    },
    // Post a newTask to json and assign an ID
    saveTask: (newTask) => {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
    },
}

export default taskDataManager