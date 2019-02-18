import newsGetAndShow from "./news/news-display"
import NewsManager from "./news/news-post-manager"
import newsItemChange from "./news/news-edit-delete"

NewsManager.generateNewsForm()
NewsManager.postNews()
newsGetAndShow()
newsItemChange()