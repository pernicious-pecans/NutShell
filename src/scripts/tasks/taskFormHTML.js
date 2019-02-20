const taskFormHTML = () => {
    return `

<section>
    <input id="taskId" name="taskId"></input>
    <input id="userId" name="userId" value=1></input>
</section>

<fieldset>
    <label class="label" for="taskName">Name of Task</label>
    <input id="taskName" type="text"></input>
    </fieldset>

    <fieldset>
    <label class="label" for="taskCompleteDate">Complete Date</label>
    <input id="taskCompleteDate" type="date"></input>
    </fieldset>

    <fieldset>
    <label class="label" for="taskCheckBox">Completed</label>
    <input id="taskCheckBox" type="checkbox" value="false"></input>
</fieldset>

<button id="enterTask">Save Task</button>
`
}

export default taskFormHTML