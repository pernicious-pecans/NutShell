import eventDataManager from "./events/evtDataMgr"
import eventList from "./events/eventList"
import eventCard from "./events/eventCard"
import formHTML from "./events/eventHTMLforForm"
import saveEvent from "./events/eventListener"
import eventAction from "./events/cardEventListener";
import formFunctions from "./events/eventForm";
// import checkEventForm from "./events/checkEventForm";


// const $ = document.querySelector.bind(document)

// const post = $("#events_input")


eventList.list()

formFunctions()


saveEvent()
eventAction()
