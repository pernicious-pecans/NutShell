import eventDataManager from "./events/evtDataMgr"
import eventList from "./events/eventList"
import eventCard from "./events/eventCard"
import formFunctions from "./events/eventForm";
import formHTML from "./events/eventHTMLforForm"

const $ = document.querySelector.bind(document)



const post = $("#events_input")


eventList.list()


post.innerHTML += formHTML()