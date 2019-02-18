import eventDataManager from "./events/evtDataMgr"
import eventList from "./events/eventList"
import eventCard from "./events/eventCard"
import formHTML from "./events/eventHTMLforForm"
import saveEvent from "./events/eventListener"
import eventAction from "./events/cardEventListener";


const $ = document.querySelector.bind(document)

const post = $("#events_input")


eventList.list()

post.innerHTML += formHTML()




// eventAction
saveEvent()
eventAction()
