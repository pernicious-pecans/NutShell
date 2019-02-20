import newsGetAndShow from "./news/newsPrintToDom"
import NewsManager from "./news/news-post-manager"
import newsEventListeners from "./news/newsEventListeners"

NewsManager.generateNewsForm()
NewsManager.postNews()
newsGetAndShow()
newsEventListeners.newsContainer()
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
