import eventDataManager from "./events/evtDataMgr"
import eventList from "./events/eventList"
import eventCard from "./events/eventCard"
import formHTML from "./events/eventHTMLforForm"
import saveEvent from "./events/eventListener"
import eventAction from "./events/cardEventListener";
import formFunctions from "./events/eventForm";


const $ = document.querySelector.bind(document)

const post = $("#events_input")


eventList.list()

formFunctions()



// eventAction
saveEvent()
eventAction()
