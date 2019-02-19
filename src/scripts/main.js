import {generateRegisterForm} from "./login/loginForm"
import {jquery} from "../lib/node_modules/jquery"
generateRegisterForm().show
import eventDataManager from "./events/evtDataMgr"
import eventList from "./events/eventList"
import eventCard from "./events/eventCard"
import formHTML from "./events/eventHTMLforForm"
import saveEvent from "./events/eventListener"


const $ = document.querySelector.bind(document)

const post = $("#events_input")


eventList.list()

post.innerHTML += formHTML()




saveEvent()
