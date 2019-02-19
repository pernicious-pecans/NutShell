import newsGetAndShow from "./news/newsPrintToDom"
import NewsManager from "./news/news-post-manager"
import newsEventListeners from "./news/newsEventListeners"

NewsManager.generateNewsForm()
NewsManager.postNews()
newsGetAndShow()
newsEventListeners