const taskFormHTML = () => {
    return `

<section>
    <input id="taskId" name="taskId"></input>
    <input id="userId" name="userId"></input>
</section>

<fieldset>
    <label class="label" for="taskName">Name of Task</label>
    <input id="taskName" type="text"></input>
    </fieldset>
    
    <fieldset>
    <label class="label" for="taskCompleteDate">Complete Date</label>
    <input id="taskCompleteDate" type="text"></input>
    </fieldset>
    
    <fieldset>
    <label class="label" for="taskCheckBox">Completed</label>
    <input id="taskCheckBox" type="checkbox"></input>
</fieldset>

<button id="enterTask">Enter Task</button>
`
}

export default taskFormHTML