import taskFormHTML from "./taskFormHTML"

const $ = document.querySelector.bind(document)
const post = $("#tasks_input")



const taskFunctions = () => {

    post.innerHTML = taskFormHTML()

}

export default taskFunctions