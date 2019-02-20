import newsGetAndShow from "./news/newsPrintToDom"
import NewsManager from "./news/news-post-manager"
import newsEventListeners from "./news/newsEventListeners"


const $ = document.querySelector.bind(document)


NewsManager.generateNewsForm()
NewsManager.postNews()
newsGetAndShow()
newsEventListeners.newsContainer()
import eventDataManager from "./events/evtDataMgr"
import eventList from "./events/eventList"
import eventCard from "./events/eventCard"
import formHTML from "./events/eventHTMLforForm"
import saveEvent from "./events/eventListener"
//
import taskFunctions from "./tasks/taskForm"
import taskList from "./tasks/taskList"
import enterTask from "./tasks/taskListener"
import eventAction from "./events/cardEventListener";
import formFunctions from "./events/eventForm";
// import checkEventForm from "./events/checkEventForm";


const post = $("#events_input")
// const $ = document.querySelector.bind(document)

// const post = $("#events_input")


eventList.list()

// Tasks
taskFunctions()
saveEvent()
taskList.taskList ()
enterTask()
formFunctions()


saveEvent()
eventAction()
