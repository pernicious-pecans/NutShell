import newsGetAndShow from "./news/newsPrintToDom"
import NewsManager from "./news/news-post-manager"
import newsEventListeners from "./news/newsEventListeners"


const $ = document.querySelector.bind(document)


NewsManager.generateNewsForm()
NewsManager.postNews()
newsGetAndShow()
newsEventListeners.newsContainer()
import eventList from "./events/eventList"
import saveEvent from "./events/eventListener"
import eventAction from "./events/cardEventListener";
import formFunctions from "./events/eventForm";





eventList.list()

formFunctions()


saveEvent()
eventAction()
