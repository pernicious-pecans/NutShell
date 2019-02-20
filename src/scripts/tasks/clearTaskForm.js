const $ = document.querySelector.bind(document)

const clearTaskForm = () => {

    $("#taskName").value = "",
    $("#taskCompleteDate").value = ""

}

export default clearTaskForm