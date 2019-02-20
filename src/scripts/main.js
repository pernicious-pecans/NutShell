import eventDataManager from "./events/evtDataMgr"
import eventList from "./events/eventList"
import eventCard from "./events/eventCard"
import formHTML from "./events/eventHTMLforForm"
import saveEvent from "./events/eventListener"
//
import taskFunctions from "./tasks/taskForm"
import taskList from "./tasks/taskList"
import enterTask from "./tasks/taskListener"


const $ = document.querySelector.bind(document)

const post = $("#events_input")


eventList.list()

post.innerHTML += formHTML()


// Tasks
taskFunctions()
saveEvent()
taskList.taskList ()
enterTask()